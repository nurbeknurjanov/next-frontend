import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalUpdate';
import { useModelForm } from '../useModelForm';
import { useUploadFile } from '../useUploadFile';
import { useProductModel } from 'components/pages/Product';
import { notify } from 'store/common/thunks';
import { updateProductThunk } from 'store/products/thunks';
import { getAggStates } from 'store/common/types';

export function useProductModalUpdate({ onClose, afterUpdate, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');

  const { model, getProductState } = useProductModel({ id });

  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );
  const aggStates = getAggStates(updateProductState);

  const {
    register,
    setValue,
    watch,
    getFieldState,
    errors,
    isValid,
    isDirty,
    handleSubmit,
  } = useModelForm({
    model: model!,
  });

  const { percentUploadImage, imageObject, deleteFile } = useUploadFile({
    id,
    setValue,
    watch,
    getFieldState,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
      afterUpdate();
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    tCommon,
    tProductPage,
    tProduct,
    aggStates,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
  };
}
