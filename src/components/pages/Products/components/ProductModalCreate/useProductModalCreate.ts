import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalCreate';
import { usePrepareForm } from '../usePrepareForm';
import { notify } from 'store/common/thunks';
import { createProductThunk } from 'store/products/thunks';
import { useUploadFile } from '../useUploadFile';

export function useProductModalCreate({ onClose, afterCreate }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductsPage = useTranslations('ProductsPage');
  const tProduct = useTranslations('Product');

  const createProductState = useAppSelector(
    products.createProduct.selector.state
  );

  const { register, setValue, watch, errors, isValid, isDirty, handleSubmit } =
    usePrepareForm({});

  const { percentUploadImage, imageObject, deleteFile } = useUploadFile({
    setValue,
    watch,
    errors,
  });

  const createProduct = async (formData: IProductPost) => {
    const { data } = await dispatch(createProductThunk(formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successCreated'), 'success'));
      afterCreate();
    }
  };

  const submitForm = createProduct;

  return {
    tCommon,
    tProductsPage,
    tProduct,
    createProductState,
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
