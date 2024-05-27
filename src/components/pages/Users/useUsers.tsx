'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { AppThunk } from 'store/store';
import { IPaginationRequest, ISorting } from 'api/baseApi';
import { isEqual } from 'lodash';
import { Button } from 'shared/ui';
import { useHydrateState, useNotify, useSetPageData } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { UserFilter, UserSort } from 'api/userApi';

export function useUsers() {
  const isServerStoreActual = useRef<boolean>();
  isServerStoreActual.current = useHydrateState();

  useSetPageData(
    'Users',
    ['Users'],
    <>
      <Button
        variant={'contained'}
        size={'small'}
        onClick={() => setShowCreateModal(true)}
      >
        Create
      </Button>
    </>
  );

  const dispatch = useAppDispatch();
  const notify = useNotify();
  const [sorting, setSorting] = useState<GridSortModel>([]);
  const previousSorting = useRef<GridSortModel>();
  const [pagination, setPagination] = useState<IPaginationRequest>({
    pageSize: 12,
    pageNumber: 0,
  });
  const previousPagination = useRef<IPaginationRequest>();
  const [filter, setFilter] = useState<UserFilter>({});
  const previousFilter = useRef<UserFilter>();
  const [refreshUsersListKey, setRefreshUsersListKey] = useState<number>(
    Math.random()
  );
  const refreshUsersList = () => setRefreshUsersListKey(Math.random());
  const previousRefreshUsersListKey = useRef<number>(refreshUsersListKey);

  const { data } = useAppSelector(users.getUsers.selector.state);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedIdToUpdate, setSelectedIdToUpdate] = useState<string | null>();
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>();

  const getUsersThunk = useCallback(
    (
      pagination: IPaginationRequest,
      sorting: GridSortModel,
      filter: UserFilter
    ): AppThunk =>
      async (dispatch, getState) => {
        const sort: ISorting<UserSort> = {};
        if (sorting[0]) {
          sort.sortField = sorting[0].field as UserSort;
          sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
        }

        await dispatch(
          users.getUsers.thunk.request({
            query: {
              pagination,
              filter,
              sort,
            },
          })
        );
        const { error } = users.getUsers.selector.state(getState());
        if (error) {
          notify(error.data, 'error');
        }
      },
    [notify]
  );

  const getUsers = useCallback(
    (
      pagination: IPaginationRequest,
      sorting: GridSortModel,
      filter: UserFilter
    ) => dispatch(getUsersThunk(pagination, sorting, filter)),
    [dispatch, getUsersThunk]
  );

  useEffect(() => {
    if (isServerStoreActual.current) return;

    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousFilter.current, filter) &&
      isEqual(previousRefreshUsersListKey.current, refreshUsersListKey)
    )
      return;

    getUsers(pagination, sorting, filter);
  }, [pagination, sorting, filter, getUsers, refreshUsersListKey]);

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
    previousRefreshUsersListKey.current = refreshUsersListKey;
  }, [refreshUsersListKey]);

  useEffect(
    () => () => {
      if (isServerStoreActual.current) return;

      dispatch(users.getUsers.action.reset());
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
    refreshUsersList,
    selectedIdToUpdate,
    setSelectedIdToUpdate,
    selectedIdToDelete,
    setSelectedIdToDelete,
    showCreateModal,
    setShowCreateModal,
  };
}
