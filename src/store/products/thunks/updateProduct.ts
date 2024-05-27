import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProductPost } from 'api/productsApi';

export const updateProductThunk =
  (id: string, body: IProductPost): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(
      products.updateProduct.thunk.request({
        id,
        body,
      })
    );

    const { error } = products.updateProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }
  };
