import {
  ResponseApiError,
  ResponseDataListPagination,
  ISort,
  Nullable,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';
import { IFile } from 'api/filesApi';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  image: IFile;
}
type IProductWithout_id = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'image'
>;
export interface IProductPost extends Nullable<IProductWithout_id> {
  image?: string | null; // on product create, to keep ID of first created File

  imageFile: FileList | null;
}
export interface IProductFilters extends Nullable<Partial<IProductWithout_id>> {
  id?: string | null;
}
export type IProductSortFields = keyof IProductWithout_id;
export interface IProductSort extends ISort<IProductSortFields> {}

export type IProductsList = ResponseDataListPagination<IProduct>;

export type IProductApiConfig = AxiosRequestConfig;
export interface IProductApiError extends ResponseApiError<string> {}
