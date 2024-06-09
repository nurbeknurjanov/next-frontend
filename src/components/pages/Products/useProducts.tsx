'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { getProductsThunk } from 'store/products/thunks';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { Button } from 'shared/ui';
import { useHydrateState, useSetPageData, useTableStates } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IProductFilters } from 'api/productsApi';
import { ModalType } from './components';

//const env = process.env.NODE_ENV;
export function useProducts() {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
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

  const getProductsState = useAppSelector(products.getProducts.selector.state);

  const isHydratedToClient = useHydrateState();

  const {
    pagination,
    setPagination,
    previousPagination,
    sorting,
    setSorting,
    previousSorting,
    filters,
    setFilters,
    previousFilters,
    refreshListKey,
    refreshList,
    previousRefreshListKey,
  } = useTableStates<IProductFilters>(['name', 'description']);

  const getProducts = useCallback(
    (
      pagination: IPaginationRequest,
      filters: IProductFilters,
      sorting: GridSortModel
    ) => dispatch(getProductsThunk(pagination, filters, sorting)),
    [dispatch]
  );

  useEffect(() => {
    if (!isHydratedToClient) return;

    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousFilters.current, filters) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousRefreshListKey.current, refreshListKey)
    )
      return;

    getProducts(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getProducts,
    refreshListKey,
    previousPagination,
    previousSorting,
    previousFilters,
    previousRefreshListKey,
    isHydratedToClient,
  ]);

  useEffect(() => {
    previousPagination.current = pagination;
  }, [pagination, previousPagination]);
  useEffect(() => {
    previousFilters.current = filters;
  }, [filters, previousFilters]);
  useEffect(() => {
    previousSorting.current = sorting;
  }, [sorting, previousSorting]);
  useEffect(() => {
    previousRefreshListKey.current = refreshListKey;
  }, [refreshListKey, previousRefreshListKey]);

  useEffect(
    () => () => {
      if (!isHydratedToClient) return;

      dispatch(products.getProducts.action.reset());
    },
    [dispatch, isHydratedToClient]
  );

  return {
    tc,
    tp,
    getProductsState,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  };
}
