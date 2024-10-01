'use client';
import { useCallback, useMemo } from 'react';
import { IPaginationRequest } from 'api/base';
import { GridSortModel } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'navigation';
import { ucFirst } from 'shared/utils';
import dayjs, { Dayjs } from 'dayjs';

export function useTableStates<TableFilters extends Record<string, any>>(
  fieldNamesForFilters: (keyof TableFilters)[],
  multipleFieldNames?: (keyof TableFilters)[],
  rangeFieldNames?: (keyof TableFilters)[]
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

  const filters = useMemo<TableFilters>(() => {
    const values = {} as TableFilters;
    fieldNamesForFilters.forEach(fieldName => {
      const queryKey = fieldName as string;
      let value: string | string[] | null | [Dayjs | null, Dayjs | null] =
        searchParams.get(queryKey);

      if (multipleFieldNames?.includes(fieldName)) {
        value = searchParams.getAll(queryKey);
      }

      if (rangeFieldNames?.includes(fieldName)) {
        value = [
          searchParams.get('from' + ucFirst(queryKey))
            ? dayjs(searchParams.get('from' + ucFirst(queryKey)) as string)
            : null,
          searchParams.get('to' + ucFirst(queryKey))
            ? dayjs(searchParams.get('to' + ucFirst(queryKey)) as string)
            : null,
        ];
      }

      if (value) {
        values[fieldName] = value as any;
      }
    });
    return values;
  }, [fieldNamesForFilters, multipleFieldNames, rangeFieldNames, searchParams]);
  const setFilters = useCallback(
    (filters: TableFilters) => {
      fieldNamesForFilters.forEach(fieldName => {
        const queryKey = fieldName as string;

        const value = filters[fieldName];
        if (value) {
          if (rangeFieldNames?.includes(fieldName)) {
            if (value[0])
              query['from' + ucFirst(queryKey)] = dayjs(value[0]).toISOString();
            else {
              delete query['from' + ucFirst(queryKey)]; //reset
            }
            if (value[1])
              query['to' + ucFirst(queryKey)] = dayjs(value[1]).toISOString();
            else {
              delete query['to' + ucFirst(queryKey)]; //reset
            }
          } else {
            query[queryKey] = value; //here sets string and array values
          }
        } else {
          delete query[queryKey]; //reset
        }
      });

      delete query.pageNumber;
      delete query.pageSize;
      delete query.sortField;
      delete query.sortDirection;
      router.push({ pathname, query }, { scroll: false });
    },
    [fieldNamesForFilters, rangeFieldNames, query, router, pathname]
  );

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
  };
}
