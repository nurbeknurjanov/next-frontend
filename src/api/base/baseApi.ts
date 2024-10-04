import { BaseApiService } from './BaseApiService';
import { attacheToken, handleErrorToken } from './interceptors';

export const baseApi = new BaseApiService({});

baseApi
  .getAxiosInstance()
  .interceptors.request.use(attacheToken, error => Promise.reject(error));

baseApi
  .getAxiosInstance()
  .interceptors.response.use(response => response, handleErrorToken);
