import { getCookie } from 'shared/utils';
import { InternalAxiosRequestConfig } from 'axios';
import { baseApi } from './baseApi';

export const attacheToken = (config: InternalAxiosRequestConfig) => {
  //config.withCredentials = true;
  if (typeof window !== 'undefined') {
    config.headers['X-Access-Token'] = getCookie('accessToken');
    config.headers['X-Refresh-Token'] = getCookie('refreshToken');
  }
  /*config.headers['cookie'] =
    `accessToken=${getCookie('accessToken')}; refreshToken=${getCookie('refreshToken')};path=/;`;*/
  return config;
};

export const handleErrorToken = async (error: any) => {
  console.log('error', error);
  if (
    typeof window !== 'undefined' &&
    error.response.status === 401 &&
    getCookie('refreshToken')
  ) {
    try {
      const newAccessToken = await fetch(
        `${baseApi.getAxiosInstance().defaults.baseURL}/auth/get-access-token`,
        {
          credentials: 'include',
          headers: {
            cookie: `refreshToken=${getCookie('refreshToken')};path=/;`,
            'X-Refresh-Token': getCookie('refreshToken')!,
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
