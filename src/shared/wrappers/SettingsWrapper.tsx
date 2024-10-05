'use client';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { baseApi } from 'api/base';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuthStateSelector } from 'store/common/selectors';
import { authorize } from 'store/common/thunks';
import { InternalAxiosRequestConfig } from 'axios';
import { JWT } from '../utils';

export const SettingsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector(getAuthStateSelector);
  const accessTokenInterceptorRef = useRef<number | null>();

  useEffect(() => {
    accessTokenInterceptorRef.current = baseApi
      .getAxiosInstance()
      .interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          //config.withCredentials = true;
          config.headers['X-Access-Token'] = accessToken;
          config.headers['X-Refresh-Token'] = refreshToken;
          /*config.headers['cookie'] =
          `accessToken=${accessToken}; refreshToken=${refreshToken};path=/;`;*/
          return config;
        },
        error => Promise.reject(error)
      );

    return () => {
      if (accessTokenInterceptorRef.current) {
        baseApi
          .getAxiosInstance()
          .interceptors.request.eject(accessTokenInterceptorRef.current);
      }
      accessTokenInterceptorRef.current = null;
    };
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const refreshTokenInterceptor = baseApi
      .getAxiosInstance()
      .interceptors.response.use(
        response => response,
        async (error: any) => {
          if (error.response.status === 401 && refreshToken) {
            try {
              const newAccessToken = await fetch(
                `${baseApi.getAxiosInstance().defaults.baseURL}/auth/get-access-token`,
                {
                  credentials: 'include',
                  headers: {
                    //cookie: `refreshToken=${refreshToken};path=/;`,
                    'X-Refresh-Token': refreshToken!,
                  },
                }
              ).then(async response => {
                if (response.ok) {
                  return response.text();
                }

                const message = await response.text();
                const error = new Error(message) as Error & {
                  status: number;
                };
                error.status = response.status;
                throw error;
              });

              const parsed = await JWT.parseToken(newAccessToken);
              dispatch(
                authorize({
                  user: parsed.user,
                  accessToken: newAccessToken,
                  refreshToken: refreshToken,
                })
              );

              if (accessTokenInterceptorRef.current) {
                baseApi
                  .getAxiosInstance()
                  .interceptors.request.eject(
                    accessTokenInterceptorRef.current
                  );
              }

              //document.cookie = `accessToken=${newAccessToken};path=/;`;
              const originalRequest = error.config;
              originalRequest.headers['X-Access-Token'] = newAccessToken;
              return await baseApi.getAxiosInstance().request(originalRequest);
            } catch (refreshTokenError) {
              return Promise.reject({ response: refreshTokenError });
            }
          }

          return Promise.reject(error);
        }
      );

    return () => {
      baseApi
        .getAxiosInstance()
        .interceptors.request.eject(refreshTokenInterceptor);
    };
  }, [dispatch, refreshToken]);

  return children;
};
