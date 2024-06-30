import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalUpdate';
import { usePrepareForm } from '../usePrepareForm';
import { useProductModel } from 'components/pages/Product';
import { notify } from 'store/common/thunks';
import { updateProductThunk } from 'store/products/thunks';
import { getAggStates } from 'store/common/types';

export function useProductModalUpdate({ onClose, afterUpdate, id }: IProps) {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tp = useTranslations('ProductPage');
  const tm = useTranslations('Product');

  const { model, getProductState } = useProductModel({ id });

  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );
  const aggStates = getAggStates(updateProductState);

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm({
    model: model!,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

    if (data) {
      onClose();
      dispatch(notify(tc('successUpdated'), 'success'));
      afterUpdate();
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    tm,
    tc,
    tp,
    aggStates,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
