import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser } from 'api/usersApi';
import { BASE_URL } from 'shared/utils';

// Define a service using a base URL and expected endpoints
export const userRTKApi = createApi({
  reducerPath: 'userApiReducerPath',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/' }),
  endpoints: builder => ({
    getUserById: builder.query<IUser, string>({
      query: ID => `users/${ID}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByIdQuery } = userRTKApi;
