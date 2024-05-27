import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';

export const deleteProductThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(
      products.deleteProduct.thunk.request({
        id,
      })
    );

    const { error } = products.deleteProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }
  };
