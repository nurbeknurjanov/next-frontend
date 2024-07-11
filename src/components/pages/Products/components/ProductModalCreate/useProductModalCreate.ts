import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files, products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalCreate';
import { useProductForm, useProductUploadFile } from '../';
import { notify } from 'store/common/thunks';
import { createProductThunk } from 'store/products/thunks';
import { useCallback, useEffect, useState } from 'react';

export function useProductModalCreate({ onClose, afterCreate }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductsPage = useTranslations('ProductsPage');
  const tProduct = useTranslations('Product');

  const createFileState = useAppSelector(files.createFile.selector.state);

  const createProductState = useAppSelector(
    products.createProduct.selector.state
  );

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
  const afterFileUploadAndRemove = useCallback(() => {
    setSelectedFileIdToDelete(null);
    afterCreate();
  }, [afterCreate]);
  const { percentUploadImage, imageObject, deleteFile } = useProductUploadFile({
    setValue,
    watch,
    schema,
    afterFileUploadAndRemove,
  });

  const onCloseWrapper = () => {
    if (!createProductState.data && createFileState.data) {
      return setSelectedFileIdToDelete(createFileState.data._id);
    }

    onClose();
  };

  const createProduct = async (formData: IProductPost) => {
    const { data } = await dispatch(createProductThunk(formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successCreated'), 'success'));
      afterCreate();
    }
  };

  const submitForm = createProduct;

  useEffect(
    () => () => {
      if (!createProductState.isFetched && createFileState.data) {
        deleteFile(createFileState.data._id);
      }
    },
    [createProductState.isFetched, createFileState.data, deleteFile]
  );

  useEffect(
    () => () => {
      dispatch(products.createProduct.action.reset());
    },
    [dispatch]
  );

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
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
    onCloseWrapper,
  };
}
