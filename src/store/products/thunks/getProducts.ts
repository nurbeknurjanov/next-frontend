import { IPaginationRequest, ISorting } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { IProductFilter, IProductSort } from 'api/productsApi';
import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';

export const getProductsThunk =
  (
    pagination: IPaginationRequest,
    sorting: GridSortModel,
    filter: IProductFilter
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: ISorting<IProductSort> = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IProductSort;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    await dispatch(
      products.getProducts.thunk.request({
        query: {
          pagination,
          filter,
          sort,
        },
      })
    );
    const { error } = products.getProducts.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }
  };
