'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { getProductsThunk } from 'store/products/thunks';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { Button } from 'shared/ui';
import {
  useSetPageData,
  useTableStates,
  useHydratedClient,
} from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IProductFilters } from 'api/productsApi';

type ModalType =
  | { type: 'create' }
  | { type: 'update' | 'delete' | 'view'; id: string };

//const env = process.env.NODE_ENV;
export function useProducts() {
  const isHydratedToClientRef = useHydratedClient();

  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tm = useTranslations('Product');
  const tps = useTranslations('ProductsPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  useSetPageData(
    tps('title'),
    [tps('title')],
    <Button
      variant={'contained'}
      size={'small'}
      onClick={() => setShowModal({ type: 'create' })}
    >
      {tps('create')}
    </Button>
  );

  const getProductsState = useAppSelector(products.getProducts.selector.state);

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
    //console.log('document.referrer', document.referrer);
    if (!isHydratedToClientRef.current) return;

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
    isHydratedToClientRef,
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
      if (!isHydratedToClientRef.current) return;

      dispatch(products.getProducts.action.reset());
    },
    [dispatch, isHydratedToClientRef]
  );

  return {
    tc,
    tm,
    tps,
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
