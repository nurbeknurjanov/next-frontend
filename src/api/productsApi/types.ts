import {
  ResponseApiError,
  ResponseDataListPagination,
  ISort,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
}
export interface IProductPost extends Omit<IProduct, '_id'> {}
export interface IProductFilter extends Partial<Omit<IProduct, '_id'>> {
  id?: string;
}
export type IProductSortFields = keyof Omit<IProduct, '_id'>;
export interface IProductSort extends ISort<IProductSortFields> {}

export type IProductsList = ResponseDataListPagination<IProduct>;

export type IProductApiConfig = AxiosRequestConfig;
export interface IProductApiError extends ResponseApiError<string> {}
