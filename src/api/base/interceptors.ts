import { getCookie } from 'shared/utils';
import { InternalAxiosRequestConfig } from 'axios';
import { baseApi } from './baseApi';

export const attacheToken = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true;
  config.headers['accessToken'] = getCookie('accessToken');
  config.headers['refreshToken'] = getCookie('refreshToken');
  /*config.headers['cookie'] =
    `accessToken=${getCookie('accessToken')}; refreshToken=${getCookie('refreshToken')};path=/;`;*/
  return config;
};

export const handleErrorToken = async (error: any) => {
  if (error.response.status === 401 && getCookie('refreshToken')) {
    try {
      const newAccessToken = await fetch(
        `${baseApi.getAxiosInstance().defaults.baseURL}/auth/get-access-token`,
        {
          credentials: 'include',
          headers: {
            cookie: `refreshToken=${getCookie('refreshToken')};path=/;`,
          },
        }
      );

      document.cookie = `accessToken=${newAccessToken};path=/;`;
      const originalRequest = error.config;
      originalRequest.headers.accessToken = newAccessToken;
      return await baseApi.getAxiosInstance().request(originalRequest);
    } catch (refreshTokenError) {
      return Promise.reject({ response: refreshTokenError });
    }
  }

  return Promise.reject(error);
};
