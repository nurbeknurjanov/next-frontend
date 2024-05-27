import { IPaginationRequest, ISorting } from './table';

export interface RequestParams<
  FilterFields extends object,
  SortFields extends string,
> {
  sort?: ISorting<SortFields>;
  filter?: FilterFields;
  pagination: IPaginationRequest;
}
