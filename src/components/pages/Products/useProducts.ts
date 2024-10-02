'use client';
import { useState, useCallback, useMemo } from 'react';
import { useAppSelector } from 'store/hooks';
import { getProductsPermissionsStateSelector } from 'store/products/selectors';
import { useTranslations } from 'next-intl';
import { useTableStates } from 'shared/hooks';
import {
  IProductFilters,
  IProductSort,
  IProductSortFields,
  useGetProductsQuery,
} from 'api/products';

type ModalType =
  | { type: 'create' }
  | { type: 'update' | 'delete' | 'view'; id: string };

//const env = process.env.NODE_ENV;
export function useProducts() {
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  const productsPermissions = useAppSelector(
    getProductsPermissionsStateSelector
  );

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
  } = useTableStates<IProductFilters>(['name', 'description']);

  const { sort } = useMemo(() => {
    const sort: IProductSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IProductSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    return {
      sort,
    };
  }, [sorting]);

  const { data, isFetching } = useGetProductsQuery({
    pagination,
    filters,
    sort,
  });

  return {
    tCommon,
    tProduct,
    isFetching,
    data,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    showModal,
    setShowModal,
    closeShowModal,
    productsPermissions,
  };
}
