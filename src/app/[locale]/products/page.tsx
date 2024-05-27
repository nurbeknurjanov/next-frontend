import styles from 'css/page.module.scss';
import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import { common, products } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { IPaginationRequest } from 'api/baseApi';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest;
}
export default async function ProductsPage({
  searchParams: _searchParams,
}: ProductsPageProps) {
  /*serverStore.dispatch(common.hydrated.actions.setIsServerStoreActual(true));
  serverStore.dispatch(common.hydrated.actions.setServerWait(true));*/

  const t = await getTranslations('ProductsPage');
  serverStore.dispatch(common.title.actions.set({ title: t('title') }));

  /*const pageNumber = searchParams.pageNumber ?? 0;
  const pageSize = searchParams.pageSize ?? 12;
  await serverStore.dispatch(
    products.getProducts.thunk.request({
      query: {
        pagination: {
          pageNumber,
          pageSize,
        },
        filter: {},
        sort: {},
      },
    })
  );
  serverStore.dispatch(common.hydrated.actions.setServerWait(false));*/
  return (
    <div className={styles.page}>
      <Products />
    </div>
  );
}
