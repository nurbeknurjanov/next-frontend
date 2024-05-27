import { AxiosRequestConfig } from 'axios';
import { RequestParams, AxiosResponseData, BaseApiService } from '../baseApi';
import {
  UserSort,
  UserFilter,
  UsersList,
  UserApiConfig,
  IUser,
  IUserPost,
} from './types';

export class UserApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getUsers(
    query: RequestParams<UserFilter, UserSort>,
    config?: UserApiConfig
  ): Promise<AxiosResponseData<UsersList>> {
    const { filter, sort, pagination } = query;
    return this.request<UsersList>({
      method: 'get',
      url: '/users',
      params: {
        ...pagination,
        ...(sort ? sort : {}),
        ...(filter ? filter : {}),
      },
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public getUser(
    id: string,
    config?: UserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'get',
      url: '/users/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    }) /*.then(
      res => new Promise(resolve => setTimeout(() => resolve(res), 5000))
    )*/;
  }

  public createUser(
    body: IUserPost,
    config?: UserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'post',
      url: '/users',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public updateUser(
    id: string,
    body: IUserPost,
    config?: UserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'put',
      url: '/users/' + id,
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public deleteUser(
    id: string,
    config?: UserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'delete',
      url: '/users/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
