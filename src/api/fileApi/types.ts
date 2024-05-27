import { ResponseApiError, ResponseDataListPagination } from 'api/baseApi';
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

export interface IFilePost
  extends Partial<Pick<IFile, 'model' | 'modelId' | 'data'>> {
  fileField: FileList;
}

export type FileFilter = Partial<IFile>;
export type FileSort = keyof IFile;

export type FilesList = ResponseDataListPagination<IFile>;

export type FileApiConfig = AxiosRequestConfig;
export interface FileApiError extends ResponseApiError<string> {}
