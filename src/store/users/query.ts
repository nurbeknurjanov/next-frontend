import { appApi } from 'api/apiQuery';
import {
  IUser,
  IUserFilters,
  IUserPost,
  IUserPostUpdate,
  IUsersList,
  IUserSort,
} from 'api/usersApi';
import { RequestParams } from 'api/baseApi';

const usersQuery = appApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<IUsersList, RequestParams<IUserFilters, IUserSort>>(
      {
        query: ({ pagination, filters, sort }) => ({
          url: `users`,
          params: {
            ...pagination,
            ...(sort ? sort : {}),
            ...(filters ? filters : {}),
          },
        }),
        providesTags: ['Users'],
      }
    ),
    getUserById: builder.query<IUser, string>({
      query: id => ({
        url: `users/${id}`,
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<IUser, IUserPost>({
      query: data => ({
        url: 'users',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<IUser, IUserPostUpdate>({
      query: ({ id, ...data }) => {
        return {
          url: `users/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  endpoints,
} = usersQuery;
