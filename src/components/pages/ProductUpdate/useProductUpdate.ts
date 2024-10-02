'use client';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useState } from 'react';
import {
  useProductForm,
  useProductUploadFile,
} from 'components/pages/Products';
import { useAppDispatch } from 'store/hooks';
import {
  IProductPost,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from 'api/products';
import { notify } from 'store/common/thunks';
import { skipToken } from '@reduxjs/toolkit/query';

type ModalType = { type: 'delete'; id: string };
export function useProductUpdate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');
  const tProductPage = useTranslations('ProductPage');
  const tProductsPage = useTranslations('ProductsPage');

  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { data: model, isFetching } = useGetProductByIdQuery(id ?? skipToken);
  const [updateModel, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const {
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
    setValue,
    watch,
  } = useProductForm({
    model: model!,
  });

  const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState<
    string | null
  >();
  const { percentUploadImage, imageObject, deleteFile } = useProductUploadFile({
    id,
    setValue,
    watch,
    schema,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await updateModel({ id, ...formData });

    if (data) {
      dispatch(notify(tCommon('successUpdated'), 'success'));

      if (document.referrer) {
        return router.back();
      }
      router.push(`/products/${model!._id}`);
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    id,
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    router,
    model,
    isFetching,
    isLoadingUpdate,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    showModal,
    setShowModal,
    percentUploadImage,
    imageObject,
    deleteFile,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
  };
}
