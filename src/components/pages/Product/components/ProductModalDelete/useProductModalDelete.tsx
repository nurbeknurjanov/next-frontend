import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './ProductModalDelete';
import { deleteProductThunk } from 'store/products/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { products } from 'store';
import { useRouter } from 'next/navigation';

export function useProductModalDelete({ onClose }: Omit<IProps, 'id'>) {
  const tp = useTranslations('ProductPage');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteProductState = useAppSelector(
    products.deleteProduct.selector.state
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteProductThunk(id));

      if (!error) {
        onClose();
        dispatch(notify(tc('successDeleted'), 'success'));
        router.push('/products');
      }
    },
    [onClose, dispatch, tc, router]
  );

  return {
    tp,
    tc,
    deleteProduct,
    deleteProductState,
  };
}
