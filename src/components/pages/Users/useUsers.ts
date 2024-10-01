'use client';
import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTableStates } from 'shared/hooks';
import {
  IUserFilters,
  IUserFiltersForm,
  IUserSort,
  IUserSortFields,
  useGetUsersQuery,
} from 'api/users';
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
    sorting,
    setSorting,
    filters: formFilters,
    setFilters,
  } = useTableStates<IUserFiltersForm>(
    ['name', 'email', 'status', 'sex', 'createdAt'],
    ['status', 'sex'],
    ['createdAt']
  );

  const { sort, filters } = useMemo(() => {
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

    return {
      sort,
      filters,
    };
  }, [sorting, formFilters]);

  const { data, isLoading } = useGetUsersQuery({ pagination, filters, sort });

  //const [getModels, { data, isLoading }] = useLazyGetUsersQuery();

  return {
    tCommon,
    tUser,
    tUsersPage,
    tProfilePage,
    setPagination,
    sorting,
    setSorting,
    filters: formFilters,
    setFilters,
    showModal,
    setShowModal,
    closeShowModal,
    data,
    isLoading,
  };
}
