'use client';
import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTableStates } from 'shared/hooks';
import {
  IFileFilters,
  IFileSort,
  IFileSortFields,
  useGetFilesQuery,
} from 'api/files';

type ModalType = { type: 'delete'; id: string };

//const env = process.env.NODE_ENV;
export function useFiles() {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tFiles = useTranslations('FilesPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
  } = useTableStates<IFileFilters>(['id', 'type', 'modelSearch']);

  const { sort } = useMemo(() => {
    const sort: IFileSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IFileSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    return {
      sort,
    };
  }, [sorting]);

  const { data, isFetching } = useGetFilesQuery({ pagination, filters, sort });

  return {
    tCommon,
    tFiles,
    tProductPage,
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
  };
}
