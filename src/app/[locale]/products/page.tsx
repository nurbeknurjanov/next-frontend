import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { IPaginationRequest } from 'api/baseApi';
import { getProductsThunk } from 'store/products/thunks';
import { setIsServerStoreActual, setServerWait } from 'store/common/thunks';
import { IProductFilter, IProductSort } from 'api/productsApi';
import { GridSortModel } from '@mui/x-data-grid';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest & IProductFilter & IProductSort;
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

  const filter = {} as IProductFilter;
  ['name', 'description'].forEach(fieldName => {
    const value = searchParams[fieldName as keyof IProductFilter];
    if (value) {
      filter[fieldName as keyof IProductFilter] = value as any;
    }
  });

  let sorting = [] as GridSortModel;
  if (searchParams.sortField) {
    sorting = [
      {
        field: searchParams.sortField,
        sort: searchParams.sortDirection ?? 'asc',
      },
    ];
  }

  await serverStore.dispatch(getProductsThunk(pagination, filter, sorting));
  serverStore.dispatch(setServerWait(false));

  return <Products />;
}
