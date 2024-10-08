import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { baseApi, IPaginationRequest } from 'api/base';
import { setServerWait, setTitle } from 'store/common/thunks';
import {
  IProductFilters,
  IProductSort,
  endpoints,
  IProductSortFields,
} from 'api/products';
import { headers } from 'next/headers';
import { authorizeUser } from '../../actions';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest & IProductFilters & IProductSort;
}
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const headersList = headers();

  const pagination = {
    pageNumber: searchParams.pageNumber ?? 0,
    pageSize: searchParams.pageSize ?? 12,
  };

  const filters: IProductFilters = {};
  ['name', 'description'].forEach(fieldName => {
    const value = searchParams[fieldName as keyof IProductFilters];
    if (value) {
      filters[fieldName as keyof IProductFilters] = value as any;
    }
  });

  const sort: IProductSort = {};
  if (searchParams.sortField) {
    sort.sortField = searchParams.sortField as IProductSortFields;
    sort.sortDirection = searchParams.sortDirection ?? 'asc';
  }

  if (!headersList.get('Referer')) {
    serverStore.dispatch(setServerWait(true));

    try {
      await authorizeUser();
    } catch (_error) {}

    const tProductsPage = await getTranslations('ProductsPage');
    serverStore.dispatch(setTitle(tProductsPage('title')));

    baseApi.getAxiosInstance().defaults.headers['X-Access-Token'] =
      serverStore.getState().common?.auth?.accessToken;
    await serverStore.dispatch(
      endpoints.getProducts.initiate(
        {
          pagination,
          filters,
          sort,
        },
        { forceRefetch: true }
      )
    );

    serverStore.dispatch(setServerWait(false));
  }

  return <Products />;
}
