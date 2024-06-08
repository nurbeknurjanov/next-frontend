import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModal';
import { usePrepareForm } from './usePrepareForm';
import { notify } from 'store/common/thunks';
import {
  getProductThunk,
  createProductThunk,
  updateProductThunk,
} from 'store/products/thunks';
import { getAggStates } from 'store/common/types';

export function useProductModal({ onClose, refreshList, ...props }: IProps) {
  const type = props.type;
  const id = type === 'update' ? props.id : null;

  const tc = useTranslations('Common');
  const t = useTranslations('ProductPage');
  const tm = useTranslations('Product');
  const ts = useTranslations('ProductsPage');
  const title = type === 'create' ? ts('create') : t('update');

  const dispatch = useAppDispatch();
  const productState = useAppSelector(products.getProduct.selector.state);
  const aggStates = getAggStates(productState);
  const model = productState.data;

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm({
    model: model!,
  });

  const createProduct = async (formData: IProductPost) => {
    const { data } = await dispatch(createProductThunk(formData));

    if (data) {
      dispatch(notify('Successfully created new product', 'success'));
      refreshList();
      onClose();
    }
  };
  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

    if (data) {
      dispatch(notify('Successfully updated the product', 'success'));
      refreshList();
      onClose();
    }
  };

  const submitForm = (formData: IProductPost) => {
    if (type === 'create') {
      createProduct(formData);
    }
    if (type === 'update') {
      updateProduct(id!, formData);
    }
  };

  const getProduct = useCallback(
    (id: string) => dispatch(getProductThunk(id)),
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getProduct(id);

      return () => {
        dispatch(products.getProduct.action.reset());
      };
    }
  }, [id, getProduct, dispatch]);

  return {
    tm,
    tc,
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
