import { createApi /*, fetchBaseQuery*/ } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/utils';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';

import { baseApi } from './baseApi';
import { ResponseApiError } from './index';

const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    AxiosRequestConfig & { isMock?: boolean },
    unknown,
    ResponseApiError<{ message: string }>
  > =>
  async ({
    url,
    method,
    data,
    params,
    headers,
    isMock: _isMock,
    ...axiosConfig
  }) => {
    try {
      const result = await baseApi.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        ...axiosConfig,
      });

      return { data: result };
    } catch (axiosError) {
      const err = axiosError as ResponseApiError<{ message: string }>;

      return {
        error: {
          ...err,
        },
      };
    }
  };

export const appApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL + '/' }),
  //baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/' }),
  tagTypes: ['Users', 'Files', 'Products'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
