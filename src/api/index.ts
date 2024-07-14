import { commonApi } from './common';
import { usersApi } from './users';
import { productsApi } from './products';
import { filesApi } from './files';

export { commonApi };
export { usersApi };
export { productsApi };
export { filesApi };

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
    error => {
      return Promise.reject(error);
    }
  );
});
