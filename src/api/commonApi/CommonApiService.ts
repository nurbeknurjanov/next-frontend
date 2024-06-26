import { AxiosRequestConfig } from 'axios';
import { AxiosResponseData, BaseApiService } from 'api/baseApi';
import {
  LoginRequestBodyParams,
  LoginResponse,
  CommonApiConfig,
} from './types';

export class CommonApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public login(
    body: LoginRequestBodyParams,
    config?: CommonApiConfig
  ): Promise<AxiosResponseData<LoginResponse>> {
    return this.request<LoginResponse>({
      method: 'post',
      url: '/login',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public auth(
    config?: CommonApiConfig
  ): Promise<AxiosResponseData<LoginResponse>> {
    return this.request<LoginResponse>({
      method: 'get',
      url: '/login',
      ...config,
      headers: {
        ...config?.headers,
      },
      withCredentials: true,
    });
  }
}
