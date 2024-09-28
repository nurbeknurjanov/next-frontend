import { appApi } from 'api/apiQuery';
import { IUser, IUserPost } from 'api/usersApi';

const usersQuery = appApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query<IUser, string>({
      query: ID => `users/${ID}`,
      providesTags: ['User'],
    }),
    addUser: builder.mutation<IUser, IUserPost>({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useAddUserMutation,
  useLazyGetUserByIdQuery,
} = usersQuery;
