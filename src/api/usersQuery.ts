import { appApi } from './apiQuery';
import {
  IUser,
  IUserApiError,
  IUserFilters,
  IUserPost,
  IUserPostUpdate,
  IUsersList,
  IUserSort,
} from './usersApi';
import { RequestParams } from './baseApi';
import { authorize, getAccessTokenThunk } from '../store/common/thunks';

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
      async queryFn(
        putData,
        _queryApi,
        _extraOptions,
        fetchWithBaseQuery
      ): Promise<{ data: IUser | null; error: IUserApiError | null }> {
        const { data, error } = await fetchWithBaseQuery({
          url: `users/profile`,
          method: 'PUT',
          data: putData,
        });

        if (error) {
          return {
            error: error as IUserApiError,
            data: null,
          };
        }

        return {
          data: data as IUser,
          error: null,
        };
        /*dispatch(authorize({ user: data }));
          await dispatch(
            getAccessTokenThunk({ config: { withCredentials: true } })
          );*/
      },
      invalidatesTags: result =>
        result ? [{ type: 'Users', id: result._id }] : [],
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
  endpoints,
} = usersQuery;
