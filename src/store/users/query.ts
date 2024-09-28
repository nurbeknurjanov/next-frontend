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
        providesTags: result => {
          return result
            ? [
                ...result.list.map(({ _id }) => ({
                  type: 'Users' as const,
                  id: _id,
                })),
                { type: 'Users', id: 'LIST' },
              ]
            : [{ type: 'Users', id: 'LIST' }];
        },
      }
    ),
    getUserById: builder.query<IUser, string>({
      query: id => ({
        url: `users/${id}`,
      }),
      providesTags: result => {
        return result ? [{ type: 'Users', id: result._id }] : [];
      },
    }),
    createUser: builder.mutation<IUser, IUserPost>({
      query: data => ({
        url: 'users',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<IUser, IUserPostUpdate>({
      query: ({ id, ...data }) => {
        return {
          url: `users/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: result => {
        return result ? [{ type: 'Users', id: result._id }] : [];
      },
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result => {
        return result ? [{ type: 'Users', id: result._id }] : [];
      },
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
