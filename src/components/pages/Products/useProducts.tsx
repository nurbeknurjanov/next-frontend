'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { getProductsThunk } from 'store/products/thunks';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { Button } from 'shared/ui';
import { useHydrateState, useSetPageData } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IProductFilter } from 'api/productsApi';
import { useTableStates } from './useTableStates';
import { ModalType } from './components/ProductModal';

//const env = process.env.NODE_ENV;
export function useProducts() {
  const dispatch = useAppDispatch();
  const tp = useTranslations('Product');
  const t = useTranslations('ProductsPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  useSetPageData(
    t('title'),
    [t('title')],
    <Button
      variant={'contained'}
      size={'small'}
      onClick={() => setShowModal({ type: 'create' })}
    >
      {t('create')}
    </Button>
  );

  const { data } = useAppSelector(products.getProducts.selector.state);

  const isServerStoreActual = useHydrateState();

  const {
    pagination,
    setPagination,
    previousPagination,
    sorting,
    setSorting,
    previousSorting,
    filter,
    setFilter,
    previousFilter,
    refreshListKey,
    refreshList,
    previousRefreshListKey,
  } = useTableStates<IProductFilter>(['name', 'description']);

  const getProducts = useCallback(
    (
      pagination: IPaginationRequest,
      filter: IProductFilter,
      sorting: GridSortModel
    ) => dispatch(getProductsThunk(pagination, filter, sorting)),
    [dispatch]
  );

  useEffect(() => {
    if (isServerStoreActual) return;

    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousFilter.current, filter) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousRefreshListKey.current, refreshListKey)
    )
      return;

    getProducts(pagination, filter, sorting);
  }, [
    pagination,
    sorting,
    filter,
    getProducts,
    refreshListKey,
    previousPagination,
    previousSorting,
    previousFilter,
    previousRefreshListKey,
    isServerStoreActual,
  ]);

  useEffect(() => {
    previousPagination.current = pagination;
  }, [pagination, previousPagination]);
  useEffect(() => {
    previousFilter.current = filter;
  }, [filter, previousFilter]);
  useEffect(() => {
    previousSorting.current = sorting;
  }, [sorting, previousSorting]);
  useEffect(() => {
    previousRefreshListKey.current = refreshListKey;
  }, [refreshListKey, previousRefreshListKey]);

  useEffect(
    () => () => {
      if (isServerStoreActual) return;

      dispatch(products.getProducts.action.reset());
    },
    [dispatch, isServerStoreActual]
  );

  return {
    tp,
    data,
    setPagination,
    sorting,
    setSorting,
    filter,
    setFilter,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  };
}
