import { AxiosRequestConfig } from 'axios';
import { RequestParams, AxiosResponseData, BaseApiService } from '../baseApi';
import {
  FileSort,
  FileFilter,
  FilesList,
  FileApiConfig,
  IFile,
  IFilePost,
} from './types';
import { omit } from 'lodash';

export class FileApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getFiles(
    query: RequestParams<FileFilter, FileSort>,
    config?: FileApiConfig
  ): Promise<AxiosResponseData<FilesList>> {
    const { filter, sort, pagination } = query;
    return this.request<FilesList>({
      method: 'get',
      url: '/files',
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

  public getFile(
    id: string,
    config?: FileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    return this.request<IFile>({
      method: 'get',
      url: '/files/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public createFile(
    body: IFilePost,
    config?: FileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    const formData = new FormData();
    for (let key in omit(body, 'fileField')) {
      if (key === 'data') {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        const value = body[key as keyof IFilePost];
        formData.append(key, value as string);
      }
    }
    formData.append('fileField', body.fileField[0]);

    return this.request<IFile>({
      method: 'post',
      url: '/filesUpload',
      data: formData,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public deleteFile(
    id: string,
    config?: FileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    return this.request<IFile>({
      method: 'delete',
      url: '/files/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
