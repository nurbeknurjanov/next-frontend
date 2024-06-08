'use client';
import { useState, useRef, useCallback, useMemo } from 'react';
import { IPaginationRequest } from '../../api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../navigation';

export function useTableStates<TableFilters extends Record<string, any>>(
  fieldNames: (keyof TableFilters)[]
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const pagination = useMemo<IPaginationRequest>(
    () => ({
      pageNumber: query.pageNumber ? Number(query.pageNumber) : 0,
      pageSize: query.pageSize ? Number(query.pageSize) : 12,
    }),
    [query.pageNumber, query.pageSize]
  );
  const setPagination = useCallback(
    (pagination: IPaginationRequest) => {
      if (pagination.pageNumber !== 0) {
        query.pageNumber = String(pagination.pageNumber);
      } else {
        delete query.pageNumber;
      }

      if (pagination.pageSize !== 12) {
        query.pageSize = String(pagination.pageSize);
      } else {
        delete query.pageSize;
      }

      router.push({ pathname, query }, { scroll: false });
    },
    [pathname, query, router]
  );
  const previousPagination = useRef<IPaginationRequest | null>(null);

  const sorting = useMemo<GridSortModel>(() => {
    if (!query.sortField) {
      return [];
    }

    return [
      {
        field: query.sortField as keyof TableFilters,
        sort: query.sortDirection ?? 'asc',
      },
    ] as GridSortModel;
  }, [query.sortField, query.sortDirection]);
  const setSorting = useCallback(
    (sorting: GridSortModel) => {
      if (sorting[0] && sorting[0].field) {
        query.sortField = sorting[0].field as keyof TableFilters as string;
      } else {
        delete query.sortField;
      }

      if (sorting[0] && sorting[0].sort === 'desc') {
        query.sortDirection = sorting[0].sort;
      } else {
        delete query.sortDirection;
      }

      router.push({ pathname, query }, { scroll: false });
    },
    [query, router, pathname]
  );
  const previousSorting = useRef<GridSortModel | null>(null);

  const filters = useMemo<TableFilters>(() => {
    const values = {} as TableFilters;
    fieldNames.forEach(fieldName => {
      const value = query[fieldName as string];
      if (value) {
        values[fieldName] = value as any;
      }
    });
    return values;
  }, [fieldNames, query]);
  const setFilters = useCallback(
    (filters: TableFilters) => {
      fieldNames.forEach(fieldName => {
        const value = filters[fieldName];
        if (value) {
          query[fieldName as string] = value;
        } else {
          delete query[fieldName as string];
        }
      });

      router.push({ pathname, query }, { scroll: false });
    },
    [fieldNames, query, router, pathname]
  );
  const previousFilters = useRef<TableFilters | null>(null);

  const [refreshListKey, setRefreshListKey] = useState<number>(Math.random());
  const previousRefreshListKey = useRef<number | null>(null);
  const refreshList = useCallback(() => setRefreshListKey(Math.random()), []);

  return {
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
  };
}
