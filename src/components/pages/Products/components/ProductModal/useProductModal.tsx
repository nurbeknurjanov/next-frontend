import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { AppThunk } from 'store/store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModal';
import { usePrepareForm } from './usePrepareForm';
import { notify } from 'store/common/thunks';
import {
  getProductThunk,
  createProductThunk as createProductThunkAction,
  updateProductThunk as updateProductThunkAction,
} from 'store/products/thunks';
import { getAggStates } from 'store/common/types';

export function useProductModal({ onClose, refreshList, ...props }: IProps) {
  const type = props.type;
  const id = type === 'update' ? props.id : null;

  const t = useTranslations('ProductPage');
  const title = type === 'create' ? t('create') : t('update');

  const dispatch = useAppDispatch();
  const productState = useAppSelector(products.getProduct.selector.state);
  const aggStates = getAggStates(productState);
  const model = productState.data;

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm({
    model: model!,
  });

  const getProduct = useCallback(
    (id: string) => dispatch(getProductThunk(id)),
    [dispatch]
  );
  const updateProductThunk =
    (id: string, formData: IProductPost): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(updateProductThunkAction(id, formData));
      const { data } = products.updateProduct.selector.state(getState());

      if (data) {
        dispatch(notify('Successfully updated the product', 'success'));
        refreshList();
        onClose();
      }
    };

  const createProductThunk =
    (formData: IProductPost): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(createProductThunkAction(formData));
      const { data } = products.createProduct.selector.state(getState());

      if (data) {
        dispatch(notify('Successfully created new product', 'success'));
        refreshList();
        onClose();
      }
    };

  const submitForm = (formData: IProductPost) => {
    if (type === 'create') {
      dispatch(createProductThunk(formData));
    }
    if (type === 'update') {
      dispatch(updateProductThunk(id!, formData));
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);

      return () => {
        dispatch(products.getProduct.action.reset());
      };
    }
  }, [id, getProduct, dispatch]);

  return {
    title,
    aggStates,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
