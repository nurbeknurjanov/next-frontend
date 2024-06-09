import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalCreate';
import { usePrepareForm } from '../usePrepareForm';
import { notify } from 'store/common/thunks';
import { createProductThunk } from 'store/products/thunks';

export function useProductModalCreate({ onClose, refreshList }: IProps) {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tp = useTranslations('ProductPage');
  const tm = useTranslations('Product');

  const createProductState = useAppSelector(
    products.createProduct.selector.state
  );

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm(
    {}
  );

  const createProduct = async (formData: IProductPost) => {
    const { data } = await dispatch(createProductThunk(formData));

    if (data) {
      dispatch(notify(tc('successCreated'), 'success'));
      refreshList();
      onClose();
    }
  };

  const submitForm = createProduct;

  return {
    tm,
    tc,
    tp,
    createProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
