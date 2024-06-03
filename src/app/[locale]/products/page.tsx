import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { IPaginationRequest, ISorting } from 'api/baseApi';
import { getProductsThunk } from 'store/products/thunks';
import { setIsServerStoreActual, setServerWait } from 'store/common/thunks';
import { IProductFilter, IProductSort } from 'api/productsApi';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest & IProductFilter & ISorting<IProductSort>;
}
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  serverStore.dispatch(setServerWait(true));

  serverStore.dispatch(setIsServerStoreActual(true));

  const t = await getTranslations('ProductsPage');
  serverStore.dispatch(common.title.actions.set({ title: t('title') }));

  const pagination = {
    pageNumber: searchParams.pageNumber ?? 0,
    pageSize: searchParams.pageSize ?? 12,
  };

  const filter = {
    name: searchParams.name,
    description: searchParams.description,
  };

  const sort = {
    sortField: searchParams.sortField,
    sortDirection: searchParams.sortDirection ?? 'asc',
  };

  await serverStore.dispatch(getProductsThunk(pagination, filter, []));
  serverStore.dispatch(setServerWait(false));

  return <Products />;
}
