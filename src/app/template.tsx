//'use client';если так сделать, тогда он будет работать постоянно на клиенте и постоянно обновляться будет
import React, { PropsWithChildren } from 'react';
import { StoreProvider } from 'shared/wrappers';
import { serverStore } from 'store/store';
import { Content, Footer, Header, Sidebar } from 'components';
import { cookies } from 'next/headers';
import styles from 'css/common.module.scss';
//import { common } from 'store';
//import { JWT } from '../backend/helpers';

/*
Template works only on server side like a layout,
 But it works for every ajax request
 It mutate the server state
 But it never works on client side
 So it doesn't fluent to client state
*/
export default async function Template({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken');
  if (accessTokenCookie?.value) {
    /*const user = JWT.parseToken(accessTokenCookie.value).user;
    serverStore.dispatch(
      common.login.actions.set({
        data: accessTokenCookie?.value,
        //@ts-ignore
        user,
        isAuth: true,
      })
    );*/
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
