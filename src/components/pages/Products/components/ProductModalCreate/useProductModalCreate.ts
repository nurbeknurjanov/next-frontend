import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProductPost, useCreateProductMutation } from 'api/products';
import { IProps } from './ProductModalCreate';
import { useProductForm, useProductUploadFile } from '../';
import { notify } from 'store/common/thunks';
import { useState, useEffect } from 'react';

export function useProductModalCreate({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductsPage = useTranslations('ProductsPage');
  const tProduct = useTranslations('Product');

  const {
    register,
    setValue,
    watch,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
  } = useProductForm({});

  const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState<
    string | null
  >();

  const { percentUploadImage, imageObject, deleteFile, dataCreated } =
    useProductUploadFile({
      setValue,
      watch,
      schema,
    });

  const [createModel, { isLoading, isSuccess }] = useCreateProductMutation();

  const onCloseWrapper = () => {
    if (!isSuccess && dataCreated) {
      return setSelectedFileIdToDelete(dataCreated._id);
    }

    onClose();
  };
  const createProduct = async (formData: IProductPost) => {
    const { data } = await createModel(formData);

    if (data) {
      onClose();
      dispatch(notify(tCommon('successCreated'), 'success'));
    }
  };

  const submitForm = createProduct;

  useEffect(
    () => () => {
      if (!isSuccess && dataCreated) {
        deleteFile(dataCreated._id);
      }
    },
    [deleteFile, isSuccess, dataCreated]
  );

  return {
    tCommon,
    tProductsPage,
    tProduct,
    isLoading,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
    onCloseWrapper,
  };
}
