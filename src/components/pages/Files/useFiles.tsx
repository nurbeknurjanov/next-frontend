'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files } from 'store';
import { getFilesThunk } from 'store/files/thunks';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { Button } from 'shared/ui';
import { useSetPageData, useTableStates } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IFileFilters } from 'api/filesApi';

type ModalType = { type: 'create' } | { type: 'delete' | 'view'; id: string };

//const env = process.env.NODE_ENV;
export function useFiles() {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tm = useTranslations('File');
  const tps = useTranslations('FilesPage');

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

  const getFilesState = useAppSelector(files.getFiles.selector.state);

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
  } = useTableStates<IFileFilters>(['id']);

  const getFiles = useCallback(
    (
      pagination: IPaginationRequest,
      filters: IFileFilters,
      sorting: GridSortModel
    ) => dispatch(getFilesThunk(pagination, filters, sorting)),
    [dispatch]
  );

  useEffect(() => {
    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousFilters.current, filters) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousRefreshListKey.current, refreshListKey)
    )
      return;

    getFiles(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getFiles,
    refreshListKey,
    previousPagination,
    previousSorting,
    previousFilters,
    previousRefreshListKey,
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
      dispatch(files.getFiles.action.reset());
    },
    [dispatch]
  );

  return {
    tc,
    tm,
    tps,
    getFilesState,
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
