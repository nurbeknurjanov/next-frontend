import { commonApi } from './common';
import { usersApi } from './users';
import { productsApi } from './products';
import { filesApi } from './files';
import { getCookie } from 'shared/utils';

//if (process.browser) document.cookie = 'accessToken=123;path=/;';

[usersApi, productsApi, filesApi, commonApi].forEach(api => {
  api.getAxiosInstance().interceptors.request.use(
    config => {
      config.withCredentials = true;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
});

[usersApi, productsApi, filesApi].forEach(api => {
  api.getAxiosInstance().interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response.status === 401 && getCookie('refreshToken')) {
        try {
          const newAccessToken = await commonApi.getAccessToken();
          document.cookie = `accessToken=${newAccessToken};path=/;`;
          const originalRequest = error.config;
          // originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
          return await api.getAxiosInstance().request(originalRequest);
        } catch (refreshTokenError) {
          return Promise.reject({ response: refreshTokenError });
        }
      }

      return Promise.reject(error);
    }
  );
});

export { commonApi };
export { usersApi };
export { productsApi };
export { filesApi };
