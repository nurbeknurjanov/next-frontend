import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProductPost } from 'api/productsApi';

export const createProductThunk =
  (body: IProductPost): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(
      products.createProduct.thunk.request({
        body,
      })
    );

    const { error } = products.createProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }
  };
