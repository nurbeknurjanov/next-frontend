import { commonApi } from './common';
import { usersApi } from './users';
import { productsApi } from './products';
import { filesApi } from './files';

export { commonApi };
export { usersApi };
export { productsApi };
export { filesApi };

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

  api.getAxiosInstance().interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      console.log('first error', error);
      if (error.response.status === 401) {
        try {
          const newAccessToken = await commonApi.getAccessToken();
          document.cookie = `accessToken=${newAccessToken};path=/;`;
          // Retry the original request with the new token
          const originalRequest = error.config;
          // originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
          return await api.getAxiosInstance().request(originalRequest);
        } catch (refreshTokenError) {
          // Handle refresh token error or redirect to login
          console.log('very bad error', refreshTokenError);
          throw refreshTokenError;
        }
      }
      return Promise.reject(error);
    }
  );
});
