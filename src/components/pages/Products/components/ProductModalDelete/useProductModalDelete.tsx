import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './ProductModalDelete';
import { deleteProductThunk } from 'store/products/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';

export function useProductModalDelete({
  refreshList,
  onClose,
}: Omit<IProps, 'id'>) {
  const t = useTranslations('ProductPage');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();

  const deleteProduct = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteProductThunk(id));

      if (!error) {
        dispatch(notify(tc('successDeleted'), 'success'));
        refreshList();
        onClose();
      }
    },
    [onClose, refreshList, dispatch]
  );

  return {
    t,
    tc,
    deleteProduct,
  };
}
