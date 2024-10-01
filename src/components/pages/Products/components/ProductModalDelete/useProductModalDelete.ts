import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './ProductModalDelete';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { useDeleteProductMutation } from 'api/products';

export function useProductModalDelete({
  onClose,
  afterDelete,
}: Omit<IProps, 'id'>) {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const dispatch = useAppDispatch();

  const [deleteModel, { isLoading }] = useDeleteProductMutation();
  const deleteProduct = useCallback(
    async (id: string) => {
      const { error } = await deleteModel(id);

      if (!error) {
        onClose();
        dispatch(notify(tCommon('successDeleted'), 'success'));
        afterDelete && afterDelete();
      }
    },
    [onClose, deleteModel, dispatch, tCommon, afterDelete]
  );

  return {
    tCommon,
    tProductPage,
    deleteProduct,
    isLoading,
  };
}
