import { InternalAxiosRequestConfig } from 'axios';
import { baseApi } from './baseApi';

let newAccessToken: string;
export const attacheTokens =
  (accessToken: string, refreshToken: string) =>
  (config: InternalAxiosRequestConfig) => {
    //config.withCredentials = true;
    config.headers['X-Access-Token'] = newAccessToken ?? accessToken;
    config.headers['X-Refresh-Token'] = refreshToken;
    /*config.headers['cookie'] =
    `accessToken=${accessToken}; refreshToken=${refreshToken};path=/;`;*/
    return config;
  };

export const handleErrorToken =
  (refreshToken: string) => async (error: any) => {
    if (error.response.status === 401 && refreshToken) {
      try {
        newAccessToken = await fetch(
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

        //document.cookie = `accessToken=${newAccessToken};path=/;`;
        const originalRequest = error.config;
        originalRequest.headers['X-Access-Token'] = newAccessToken;
        return await baseApi.getAxiosInstance().request(originalRequest);
      } catch (refreshTokenError) {
        return Promise.reject({ response: refreshTokenError });
      }
    }

    return Promise.reject(error);
  };
