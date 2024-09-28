import { appApi } from 'api/apiQuery';
import { IUser, IUserPost, IUserPostUpdate } from 'api/usersApi';

const usersQuery = appApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<IUser, string>({
      query: () => ({
        url: `users`,
      }),
      providesTags: ['Users'],
    }),
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
  }),
});

export const {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  endpoints,
} = usersQuery;
