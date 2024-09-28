'use client';
import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { isEqual } from 'lodash';
import { useTableStates } from 'shared/hooks';
import {
  IUserFilters,
  IUserFiltersForm,
  IUserSort,
  IUserSortFields,
} from 'api/usersApi';
import { useLazyGetUsersQuery } from 'store/users/query';
import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import dayjs from 'dayjs';

type ModalType =
  | { type: 'create' }
  | { type: 'update' | 'delete' | 'view' | 'changePassword'; id: string };

//const env = process.env.NODE_ENV;
export function useUsers() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const tProfilePage = useTranslations('ProfilePage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

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
  } = useTableStates<IUserFiltersForm>(
    ['name', 'email', 'status', 'sex', 'createdAt'],
    ['status', 'sex'],
    ['createdAt']
  );

  const [getModels, { data, isLoading }] = useLazyGetUsersQuery();

  const getUsers = useCallback(
    (
      pagination: IPaginationRequest,
      formFilters: IUserFiltersForm,
      sorting: GridSortModel
    ) => {
      const sort: IUserSort = {};
      if (sorting[0]) {
        sort.sortField = sorting[0].field as IUserSortFields;
        sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
      }

      const { createdAt, ...rest } = formFilters;
      const filters: IUserFilters = rest;
      if (createdAt[0]) {
        filters.createdAtFrom = dayjs(createdAt[0]).hour(0).toISOString();
      }
      if (createdAt[1]) {
        filters.createdAtTo = dayjs(createdAt[1])
          .hour(23)
          .minute(59)
          .second(59)
          .toISOString();
      }

      getModels({
        pagination,
        filters,
        sort,
      });
    },
    [getModels]
  );

  useEffect(() => {
    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousFilters.current, filters) &&
      isEqual(previousSorting.current, sorting)
    )
      return;

    getUsers(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getUsers,
    previousPagination,
    previousSorting,
    previousFilters,
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

  return {
    tCommon,
    tUser,
    tUsersPage,
    tProfilePage,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    showModal,
    setShowModal,
    closeShowModal,
    data,
    isLoading,
  };
}
