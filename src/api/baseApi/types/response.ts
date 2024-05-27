import { IPagination } from './table';
import { AxiosResponse } from 'axios';

export type ResponseData<T> = T;
export type ResponseDataArray<T> = ResponseData<T[]>;

export interface ResponseDataListPagination<T> {
  list: ResponseDataArray<T>;
  pagination: IPagination;
}

export interface ResponseApiError<T = any> {
  code: string; //"ERR_BAD_REQUEST", "ERR_BAD_RESPONSE"
  status: number; //401, 500
  statusText: string; //"Unauthorized", "Internal Server Error"
  data: T; //"Not authorized", //bad error html
}

export type AxiosResponseData<T> = AxiosResponse<T>['data'];
