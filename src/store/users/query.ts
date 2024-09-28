import { appApi } from 'api/apiQuery';
import { IUser, IUserPost } from 'api/usersApi';

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
    addUser: builder.mutation<IUser, IUserPost>({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<IUser, IUserPost>({
      query: ({ ...body }) => ({
        url: `users/${1}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useAddUserMutation,
  useLazyGetUsersQuery,
  endpoints,
} = usersQuery;
