'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files } from 'store';
import { AppThunk } from 'store/store';
import { IPaginationRequest, ISorting } from 'api/baseApi';
import { isEqual } from 'lodash';
import { useNotify, useSetPageData } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { FileFilter, FileSort } from 'api/fileApi';
import { Button } from '../../../shared/ui';

export function useFiles() {
  const title = 'Assets';
  useSetPageData(
    title,
    [title],
    <>
      <Button variant={'contained'} onClick={() => setShowCreateModal(true)}>
        Upload new file
      </Button>
    </>
  );

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>();

  const dispatch = useAppDispatch();
  const notify = useNotify();
  const [sorting, setSorting] = useState<GridSortModel>([]);
  const previousSorting = useRef<GridSortModel>();
  const [pagination, setPagination] = useState<IPaginationRequest>({
    pageSize: 12,
    pageNumber: 0,
  });
  const previousPagination = useRef<IPaginationRequest>();
  const [filter, setFilter] = useState<FileFilter>({ model: '0' });
  const previousFilter = useRef<FileFilter>();
  const [refreshFilesListKey, setRefreshFilesListKey] = useState<number>(
    Math.random()
  );
  const refreshFilesList = () => setRefreshFilesListKey(Math.random());
  const previousRefreshFilesListKey = useRef<number>(refreshFilesListKey);

  const { data } = useAppSelector(files.getFiles.selector.state);

  const getFilesThunk = useCallback(
    (
      pagination: IPaginationRequest,
      sorting: GridSortModel,
      filter: FileFilter
    ): AppThunk =>
      async (dispatch, getState) => {
        const sort: ISorting<FileSort> = {};
        if (sorting[0]) {
          sort.sortField = sorting[0].field as FileSort;
          sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
        }

        await dispatch(
          files.getFiles.thunk.request({
            query: {
              pagination,
              filter,
              sort,
            },
          })
        );
        const { error } = files.getFiles.selector.state(getState());
        if (error) {
          notify(error.data, 'error');
        }
      },
    [notify]
  );

  const getFiles = useCallback(
    (
      pagination: IPaginationRequest,
      sorting: GridSortModel,
      filter: FileFilter
    ) => dispatch(getFilesThunk(pagination, sorting, filter)),
    [dispatch, getFilesThunk]
  );

  useEffect(() => {
    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousFilter.current, filter) &&
      isEqual(previousRefreshFilesListKey.current, refreshFilesListKey)
    )
      return;

    getFiles(pagination, sorting, filter);
  }, [pagination, sorting, filter, getFiles, refreshFilesListKey]);

  useEffect(() => {
    previousPagination.current = pagination;
  }, [pagination]);
  useEffect(() => {
    previousSorting.current = sorting;
  }, [sorting]);
  useEffect(() => {
    previousFilter.current = filter;
  }, [filter]);
  useEffect(() => {
    previousRefreshFilesListKey.current = refreshFilesListKey;
  }, [refreshFilesListKey]);

  useEffect(
    () => () => {
      dispatch(files.getFiles.action.reset());
    },
    [dispatch]
  );

  return {
    data,
    setPagination,
    sorting,
    setSorting,
    filter,
    setFilter,
    showCreateModal,
    setShowCreateModal,
    selectedIdToDelete,
    setSelectedIdToDelete,
    refreshFilesList,
  };
}
