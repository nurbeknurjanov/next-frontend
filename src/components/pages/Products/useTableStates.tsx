'use client';
import {
  useState,
  useRef,
  useCallback,
  MutableRefObject,
  useMemo,
} from 'react';
import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'navigation';

export function useTableStates<TableFilter extends Record<string, any>>(
  fieldNames: (keyof TableFilter)[]
): {
  pagination: IPaginationRequest;
  setPagination: (_pagination: IPaginationRequest) => void;
  previousPagination: MutableRefObject<IPaginationRequest | null>;
  sorting: GridSortModel;
  setSorting: (_sorting: GridSortModel) => void;
  previousSorting: MutableRefObject<GridSortModel | null>;
  filter: TableFilter;
  setFilter: (_filter: TableFilter) => void;
  previousFilter: MutableRefObject<TableFilter | null>;
  refreshListKey: number;
  refreshList: () => void;
  previousRefreshListKey: MutableRefObject<number | null>;
} {
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
        field: query.sortField as keyof TableFilter,
        sort: query.sortDirection ?? 'asc',
      },
    ] as GridSortModel;
  }, [query.sortField, query.sortDirection]);
  const setSorting = useCallback(
    (sorting: GridSortModel) => {
      if (sorting[0] && sorting[0].field) {
        query.sortField = sorting[0].field as keyof TableFilter as string;
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

  const filter = useMemo<TableFilter>(() => {
    const values = {} as TableFilter;
    fieldNames.forEach(fieldName => {
      const value = query[fieldName as string];
      if (value) {
        values[fieldName] = value as any;
      }
    });
    return values;
  }, [fieldNames, query]);
  const setFilter = useCallback(
    (filter: TableFilter) => {
      fieldNames.forEach(fieldName => {
        const value = filter[fieldName];
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
  const previousFilter = useRef<TableFilter | null>(null);

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
    filter,
    setFilter,
    previousFilter,
    refreshListKey,
    refreshList,
    previousRefreshListKey,
  };
}
