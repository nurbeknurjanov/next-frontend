import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';

export const getProductThunk =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(
      products.getProduct.thunk.request({
        id,
      })
    );

    const { error } = products.getProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }
  };
