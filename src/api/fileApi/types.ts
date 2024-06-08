import {
  ISort,
  Nullable,
  ResponseApiError,
  ResponseDataListPagination,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export interface IFile {
  _id?: string;
  model: 'Game' | '0';
  modelId: string;
  data: {
    type: 'thumbnail' | 'image';
  };
  ext: string;
  originalFileName: string;
  url: string;
  assetId: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

type IFileWithout_id = Omit<IFile, '_id'>;

export interface IFilePost
  extends Partial<Pick<IFile, 'model' | 'modelId' | 'data'>> {
  fileField: FileList;
}

export type IFileFilters = Nullable<Partial<IFileWithout_id>> & {
  id?: string | null;
};
export type IFileSortFields = keyof IFileWithout_id;
export interface IFileSort extends ISort<IFileSortFields> {}

export type IFilesList = ResponseDataListPagination<IFile>;

export type FileApiConfig = AxiosRequestConfig;
export interface FileApiError extends ResponseApiError<string> {}
