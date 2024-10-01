import { BaseApiService } from './BaseApiService';
import { getCookie } from 'shared/utils';

export const baseApi = new BaseApiService({});

baseApi.getAxiosInstance().interceptors.request.use(
  config => {
    config.withCredentials = true;
    config.headers['accessToken'] = getCookie('accessToken');
    config.headers['refreshToken'] = getCookie('refreshToken');
    /*config.headers['cookie'] =
      `accessToken=${getCookie('accessToken')}; refreshToken=${getCookie('refreshToken')};path=/;`;*/
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

baseApi.getAxiosInstance().interceptors.response.use(
  response => {
    return response;
  },
  async error => {
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
  }
);
