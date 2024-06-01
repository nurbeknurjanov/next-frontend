import React from 'react';
import styles from '../../../../components/layout/Content/components/Page/page.module.scss';
import { User } from 'components/pages';
import { serverStore } from 'store/store';
import { common, users } from 'store';
import type { PageProps } from 'app/types';

export interface UserPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function UserPage({
  params,
  //searchParams,
}: UserPageProps) {
  const { id } = params;
  serverStore.dispatch(common.hydrated.actions.setIsServerStoreActual(true));
  serverStore.dispatch(common.hydrated.actions.setServerWait(true));

  await serverStore.dispatch(users.getUser.thunk.request({ id }));
  const data = serverStore.getState().users.getUser.data;
  serverStore.dispatch(common.title.actions.set({ title: data!.name }));

  serverStore.dispatch(common.hydrated.actions.setServerWait(false));
  if (Number(id) > 10) {
    //return notFound();
  }

  return (
    <div className={styles.page}>
      <User />
    </div>
  );
}
