import React from 'react';
import styles from 'css/page.module.scss';
import { Product } from 'components/pages';
/*import { serverStore } from 'store/store';
import { common, subtypes } from 'store';*/
import type { PageProps } from 'app/types';

export interface ProductPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function ProductPage({
  params,
  //searchParams,
}: ProductPageProps) {
  const { id } = params;
  /*serverStore.dispatch(common.hydrated.actions.setIsServerStoreActual(true));
  serverStore.dispatch(common.hydrated.actions.setServerWait(true));

  await serverStore.dispatch(subtypes.getSubtype.thunk.request({ id }));
  const data = serverStore.getState().subtypes.getSubtype.data;
  serverStore.dispatch(common.title.actions.set({ title: data!.name }));

  serverStore.dispatch(common.hydrated.actions.setServerWait(false));*/
  if (Number(id) > 10) {
    //return notFound();
  }

  return (
    <div className={styles.page}>
      <Product />
    </div>
  );
}
