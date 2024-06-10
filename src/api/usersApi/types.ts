import {
  ISort,
  Nullable,
  ResponseApiError,
  ResponseDataListPagination,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export enum SEX_ENUM {
  MALE = 1,
  FEMALE = 0,
}
export enum STATUS_ENUM {
  ENABLED = 1,
  DISABLED = 0,
}

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  sex: SEX_ENUM;
  status: STATUS_ENUM;
  createdAt: string;
  updatedAt: string;
};

type IUserWithout_id = Omit<IUser, '_id'>;
export interface IUserPost extends IUserWithout_id {}
export interface IUserFilters extends Nullable<Partial<IUserWithout_id>> {
  id?: string | null;
}
export type IUserSortFields = keyof IUserWithout_id;
export interface IUserSort extends ISort<IUserSortFields> {}

export type IUsersList = ResponseDataListPagination<IUser>;

export type IUserApiConfig = AxiosRequestConfig;

export interface IUserApiError extends ResponseApiError<string> {}

/*export interface IUserApiError
  extends ResponseApiError<{ code: number; message: string }> {}*/