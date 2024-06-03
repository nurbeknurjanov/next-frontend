export interface ISort<Fields extends string> {
  sortDirection?: 'asc' | 'desc';
  sortField?: Fields;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface IPaginationRequest
  extends Omit<IPagination, 'total' | 'pageCount'> {}

export type Nullable<T> = T | null;
