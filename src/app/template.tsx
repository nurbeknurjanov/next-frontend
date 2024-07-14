//'use client'; //если так сделать, тогда он будет работать постоянно на клиенте и постоянно обновляться будет
'use server';
import React, { PropsWithChildren } from 'react';
import { StoreProvider } from 'shared/wrappers';
import { serverStore } from 'store/store';
import { Content, Footer, Header, Sidebar } from 'components';
import { cookies, headers } from 'next/headers';
import styles from 'css/common.module.scss';
import { authorize, logout, hydratedToClient } from 'store/common/thunks';
import { JWT } from 'shared/utils';

/*
Template works only on server side like a layout,
 But it works for every ajax request
 It mutate the server state
 But it never works on client side
 So it doesn't fluent to client state
*/
export default async function Template({ children }: PropsWithChildren) {
  const headersList = headers();

  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken');

  if (accessTokenCookie?.value) {
    try {
      const parsed = await JWT.parseToken(accessTokenCookie.value);
      serverStore.dispatch(authorize({ user: parsed.user }));
    } catch (_error) {
      serverStore.dispatch(logout());
      cookieStore.delete('refreshToken');
      cookieStore.delete('accessToken');
    }
  } else {
    serverStore.dispatch(logout());
  }

  if (serverStore.getState().common.hydrate.serverWait) {
    await new Promise(resolve => {
      setInterval(() => {
        if (serverStore.getState().common.hydrate.serverWait === false) {
          resolve(true);
        }
      }, 0);
    });
  }

  //console.log("header headersList.get('Referer')", headersList.get('Referer'));
  serverStore.dispatch(hydratedToClient(!!headersList.get('Referer')));

  return (
    <StoreProvider initialState={serverStore.getState()}>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <Content>{children}</Content>
      </main>
      <Footer />
    </StoreProvider>
  );
}
