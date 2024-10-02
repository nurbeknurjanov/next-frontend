import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import {
  IProductPost,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from 'api/products';
import { IProps } from './ProductModalUpdate';
import { useProductForm, useProductUploadFile } from '../';
import { notify } from 'store/common/thunks';
import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

export function useProductModalUpdate({ onClose, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');

  const { data: model, isFetching } = useGetProductByIdQuery(id ?? skipToken);
  const [updateModel, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const {
    register,
    setValue,
    watch,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
  } = useProductForm({
    model: model!,
  });

  const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState<
    string | null
  >();

  const { percentUploadImage, imageObject, deleteFile, isLoadingFileDelete } =
    useProductUploadFile({
      id,
      setValue,
      watch,
      schema,
    });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await updateModel({ id, ...formData });

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    tCommon,
    tProductPage,
    tProduct,
    isFetching,
    isLoadingUpdate,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
    isLoadingFileDelete,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
  };
}
