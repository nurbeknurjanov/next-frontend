import { BaseApiService } from './BaseApiService';
import { attacheTokens, handleErrorToken } from './interceptors';
import { BASE_URL, getCookie } from 'shared/utils';

export const baseApi = new BaseApiService({ baseURL: BASE_URL });

if (typeof window !== 'undefined') {
  baseApi
    .getAxiosInstance()
    .interceptors.request.use(
      attacheTokens(getCookie('accessToken')!, getCookie('refreshToken')!),
      error => Promise.reject(error)
    );

  baseApi
    .getAxiosInstance()
    .interceptors.response.use(
      response => response,
      handleErrorToken(getCookie('refreshToken')!)
    );
}
