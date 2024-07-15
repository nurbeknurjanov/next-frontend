'use server';

import { cookies } from 'next/headers';
import { JWT } from 'shared/utils';
import { serverStore } from 'store/store';
import { authorize, logout } from 'store/common/thunks';
import { commonApi } from 'api';

export async function authorizeUser() {
  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get('refreshToken');
  const accessTokenCookie = cookieStore.get('accessToken');
  if (!accessTokenCookie?.value || !refreshTokenCookie?.value) {
    serverStore.dispatch(logout());
    throw new Error('There is no access token');
  }

  try {
    const parsed = await JWT.parseToken(accessTokenCookie.value);
    return serverStore.dispatch(authorize({ user: parsed.user }));
  } catch (error) {
    try {
      commonApi.getAxiosInstance().defaults.headers.cookie = `refreshToken=${refreshTokenCookie.value};path=/;`;
      //originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
      const newAccessToken = await commonApi.getAccessToken();
      const newParsed = await JWT.parseToken(newAccessToken);
      return serverStore.dispatch(
        authorize({ user: newParsed.user, newAccessToken })
      );
    } catch (refreshTokenError) {
      //todo to check
      console.log('refreshTokenError1', refreshTokenError);
      throw new Error((refreshTokenError as Error).message);
    }
  }
}
