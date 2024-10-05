'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { baseApi } from 'api/base';
import { attacheTokens, handleErrorToken } from 'api/base/interceptors';
import { getCookie } from 'shared/utils';

export const SettingsWrapper: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const accessTokenInterceptor = baseApi
      .getAxiosInstance()
      .interceptors.request.use(
        attacheTokens(getCookie('accessToken')!, getCookie('refreshToken')!),
        error => Promise.reject(error)
      );

    const refreshTokenInterceptor = baseApi
      .getAxiosInstance()
      .interceptors.response.use(
        response => response,
        handleErrorToken(getCookie('refreshToken')!)
      );

    return () => {
      baseApi
        .getAxiosInstance()
        .interceptors.request.eject(accessTokenInterceptor);
      baseApi
        .getAxiosInstance()
        .interceptors.request.eject(refreshTokenInterceptor);
    };
  }, []);
  return children;
};
