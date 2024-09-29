import { appApi, RequestParams } from 'api/base';
import {
  IUser,
  IUserFilters,
  IUserPost,
  IUserPostUpdate,
  IUsersList,
  IUserSort,
} from './index';
import { getAccessTokenThunk, authorize } from 'store/common/thunks';

const query = appApi.injectEndpoints({
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
        providesTags: result =>
          result
            ? [
                ...result.list.map(({ _id }) => ({
                  type: 'Users' as const,
                  id: _id,
                })),
                { type: 'Users', id: 'LIST' },
              ]
            : [{ type: 'Users', id: 'LIST' }],
      }
    ),
    getUserById: builder.query<IUser, string>({
      query: id => ({
        url: `users/${id}`,
      }),
      providesTags: result =>
        result ? [{ type: 'Users', id: result._id }] : [],
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
      invalidatesTags: result =>
        result ? [{ type: 'Users', id: result._id }] : [],
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: id => {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result =>
        result ? [{ type: 'Users', id: result._id }] : [],
    }),
    updateProfile: builder.mutation<IUser, IUserPost>({
      async queryFn(putData, queryApi, _extraOptions, fetchWithBaseQuery) {
        const { data, error } = await fetchWithBaseQuery({
          url: `users/profile`,
          method: 'PUT',
          data: putData,
        });

        if (error) {
          return {
            error,
          };
        }

        queryApi.dispatch(authorize({ user: data as IUser }));
        await queryApi.dispatch(
          getAccessTokenThunk({ config: { withCredentials: true } })
        );

        return {
          data: data as IUser,
        };
      },
      invalidatesTags: result =>
        result ? [{ type: 'Users', id: result._id }] : [],
    }),
    updateProfilePassword: builder.mutation<IUser, Pick<IUserPost, 'password'>>(
      {
        query: data => ({
          url: 'users/profile/change-password',
          method: 'PUT',
          data,
        }),
      }
    ),
    updateUserPassword: builder.mutation<
      IUser,
      Pick<IUserPost, 'password'> & { id: string }
    >({
      query: ({ id, ...data }) => ({
        url: `users/${id}/change-password`,
        method: 'PUT',
        data,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateProfileMutation,
  useUpdateProfilePasswordMutation,
  useUpdateUserPasswordMutation,
} = query;
