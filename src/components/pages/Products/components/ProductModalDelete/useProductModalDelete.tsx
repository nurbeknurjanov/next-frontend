import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './ProductModalDelete';
import { deleteProductThunk as deleteProductThunkAction } from 'store/products/thunks';
import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';

export function useProductModalDelete({
  refreshList,
  onClose,
}: Omit<IProps, 'id'>) {
  const t = useTranslations('ProductPage');
  const dispatch = useAppDispatch();

  const deleteProductThunk = useCallback(
    (id: string): AppThunk =>
      async (dispatch, getState) => {
        await dispatch(deleteProductThunkAction(id));
        const { data } = products.deleteProduct.selector.state(getState());

        if (data) {
          dispatch(notify('Successfully deleted the product', 'success'));
          refreshList();
          onClose();
        }
      },
    [onClose, refreshList]
  );

  const deleteProduct = useCallback(
    (id: string) => dispatch(deleteProductThunk(id)),
    [deleteProductThunk, dispatch]
  );

  return {
    t,
    deleteProduct,
  };
}
