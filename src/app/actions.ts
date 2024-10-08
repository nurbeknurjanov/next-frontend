'use server';

import { cookies } from 'next/headers';
import { JWT } from 'shared/utils/jwt';
import { serverStore } from 'store/store';
import { authorize, logout } from 'store/common/thunks';
import { baseApi } from 'api/base';

export async function authorizeUser() {
  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get('refreshToken');
  const accessTokenCookie = cookieStore.get('accessToken');
  if (!accessTokenCookie?.value || !refreshTokenCookie?.value) {
    serverStore.dispatch(logout());
    throw new Error('There is no any token');
  }

  try {
    const parsed = await JWT.parseToken(accessTokenCookie.value);
    if (!parsed?.user?._id) {
      throw new Error('Bad access token');
    }

    return serverStore.dispatch(
      authorize({
        user: parsed.user,
        accessToken: accessTokenCookie.value,
        refreshToken: refreshTokenCookie.value,
      })
    ); //authorize user
  } catch (_error) {
    try {
      //commonApi.getAxiosInstance().defaults.headers.cookie = `refreshToken=${refreshTokenCookie.value};path=/;`;
      //originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
      const newAccessToken = await fetch(
        `${baseApi.getAxiosInstance().defaults.baseURL}/auth/get-access-token`,
        {
          credentials: 'include',
          headers: {
            //cookie: `refreshToken=${refreshTokenCookie.value};path=/;`,
            'X-Refresh-Token': refreshTokenCookie.value,
          },
        }
      ).then(async response => {
        if (response.ok) {
          return response.text();
        }

        const message = await response.text();
        const error = new Error(message) as Error & {
          status: number;
        };
        error.status = response.status;
        throw error;
      });

      //authorize user
      const newParsed = await JWT.parseToken(newAccessToken);
      return serverStore.dispatch(
        authorize({
          user: newParsed.user,
          accessToken: newAccessToken,
          refreshToken: refreshTokenCookie.value,
        })
      );
    } catch (refreshTokenError) {
      serverStore.dispatch(logout());

      console.warn('Bad refreshTokenError', refreshTokenError);
      throw refreshTokenError;
    }
  }
}
