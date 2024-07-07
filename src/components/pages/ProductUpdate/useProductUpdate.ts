'use client';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from '../Product';
import { useState } from 'react';
import { useModelForm } from '../Products';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { IProductPost } from 'api/productsApi';
import { updateProductThunk } from 'store/products/thunks';
import { notify } from 'store/common/thunks';

type ModalType = { type: 'delete'; id: string };
export function useProductUpdate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');
  const tProductPage = useTranslations('ProductPage');
  const tProductsPage = useTranslations('ProductsPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });

  const { register, errors, isValid, isDirty, handleSubmit } = useModelForm({
    model: model!,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

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
    updateProductState,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    showModal,
    setShowModal,
  };
}
