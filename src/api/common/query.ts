import { appApi } from 'api/base';
import { LoginRequestBodyParams, LoginResponse } from './types';

const query = appApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequestBodyParams>({
      query: data => ({
        url: `auth/login`,
        method: 'POST',
        data,
      }),
    }),
    getAccessToken: builder.query<string, unknown>({
      query: () => ({
        url: `auth/get-access-token`,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAccessTokenQuery } = query;
