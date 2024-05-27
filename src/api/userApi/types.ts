import { ResponseApiError, ResponseDataListPagination } from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

/*export enum TypeLogo {
  Album = 'album',
  Portrait = 'portrait',
}*/

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
};
export type UserFilter = Partial<Omit<IUser, 'password'>>;
export type UserSort = Exclude<keyof IUser, '_id' | 'password'>;
export type IUserPost = Omit<IUser, '_id'>;

export type UsersList = ResponseDataListPagination<IUser>;

export type UserApiConfig = AxiosRequestConfig;

export interface UserApiError extends ResponseApiError<string> {}

/*export interface UserApiError
  extends ResponseApiError<{ code: number; message: string }> {}*/
