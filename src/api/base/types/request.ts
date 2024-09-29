import { IPaginationRequest, ISort } from './table';

export interface RequestParams<
  F extends Record<string, any>,
  S extends ISort<string>,
> {
  pagination: IPaginationRequest;
  filters?: F;
  sort?: S;
}
