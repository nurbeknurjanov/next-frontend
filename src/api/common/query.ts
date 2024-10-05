import { appApi } from 'api/base';
import { LoginRequestBodyParams, LoginResponse } from './types';
import { authorize, logout } from 'store/common/thunks';
import { JWT } from 'shared/utils/jwt';

const query = appApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequestBodyParams>({
      async queryFn(postData, queryApi, _extraOptions, fetchWithBaseQuery) {
        const { data, error } = await fetchWithBaseQuery({
          url: `auth/login`,
          method: 'POST',
          data: postData,
        });

        if (error) {
          return {
            error,
          };
        }

        const { accessToken, refreshToken } = data as LoginResponse;
        const accessTokenParsed = await JWT.parseToken(accessToken);
        queryApi.dispatch(
          authorize({ user: accessTokenParsed.user, accessToken, refreshToken })
        );

        return {
          data: data as LoginResponse,
        };
      },
    }),
    getAccessToken: builder.query<string, unknown>({
      async queryFn(_, queryApi, _extraOptions, fetchWithBaseQuery) {
        const { data, error } = await fetchWithBaseQuery({
          url: `auth/get-access-token`,
        });

        if (error) {
          queryApi.dispatch(logout());
          return {
            error,
          };
        }

        return {
          data: data as string,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = query;
