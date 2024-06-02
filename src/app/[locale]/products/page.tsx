import styles from '../../../components/layout/Content/components/Page/page.module.scss';
import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { IPaginationRequest } from 'api/baseApi';
import { getProductsThunk } from 'store/products/thunks';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest;
}
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  serverStore.dispatch(common.hydrate.actions.setServerWait(true));

  serverStore.dispatch(common.hydrate.actions.setIsServerStoreActual(true));

  const t = await getTranslations('ProductsPage');
  serverStore.dispatch(common.title.actions.set({ title: t('title') }));

  const pageNumber = searchParams.pageNumber ?? 0;
  const pageSize = searchParams.pageSize ?? 12;
  await serverStore.dispatch(
    getProductsThunk(
      {
        pageNumber,
        pageSize,
      },
      [],
      {}
    )
  );
  serverStore.dispatch(common.hydrate.actions.setServerWait(false));

  return (
    <div className={styles.page}>
      <Products />
    </div>
  );
}
