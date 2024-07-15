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
    return serverStore.dispatch(logout());
  }

  try {
    const parsed = await JWT.parseToken(accessTokenCookie.value);
    return serverStore.dispatch(authorize({ user: parsed.user }));
  } catch (error) {
    try {
      const newAccessToken = await commonApi.getAccessToken();
      const newParsed = await JWT.parseToken(newAccessToken);
      return serverStore.dispatch(authorize({ user: newParsed.user }));
    } catch (refreshTokenError) {
      throw new Error((refreshTokenError as Error).message);
    }
  }
}
