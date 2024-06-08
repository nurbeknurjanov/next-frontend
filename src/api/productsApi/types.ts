import {
  ResponseApiError,
  ResponseDataListPagination,
  ISort,
  Nullable,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
}
type IProductWithout_id = Omit<IProduct, '_id'>;
export interface IProductPost extends IProductWithout_id {}
export interface IProductFilter extends Nullable<Partial<IProductWithout_id>> {
  id?: string | null;
}
export type IProductSortFields = keyof IProductWithout_id;
export interface IProductSort extends ISort<IProductSortFields> {}

export type IProductsList = ResponseDataListPagination<IProduct>;

export type IProductApiConfig = AxiosRequestConfig;
export interface IProductApiError extends ResponseApiError<string> {}
