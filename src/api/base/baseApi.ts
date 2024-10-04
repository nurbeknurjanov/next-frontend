import { BaseApiService } from './BaseApiService';
import { attacheToken, handleErrorToken } from './interceptors';
import { BASE_URL } from 'shared/utils';

export const baseApi = new BaseApiService({ baseURL: BASE_URL });

baseApi
  .getAxiosInstance()
  .interceptors.request.use(attacheToken, error => Promise.reject(error));

baseApi
  .getAxiosInstance()
  .interceptors.response.use(response => response, handleErrorToken);
