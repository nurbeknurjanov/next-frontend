'use client';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from '../Product';
import { useState } from 'react';
import { usePrepareForm } from '../Products';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { IProductPost } from 'api/productsApi';
import { updateProductThunk } from 'store/products/thunks';
import { notify } from 'store/common/thunks';

type ModalType = { type: 'delete'; id: string };
export function useProductUpdate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tc = useTranslations('Common');
  const ts = useTranslations('ProductsPage');
  const tp = useTranslations('ProductPage');
  const tm = useTranslations('Product');
  const title = tp('update');
  const [showModal, setShowModal] = useState<ModalType | null>();
  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });

  useSetPageData(title, [
    {
      label: ts('title'),
      href: '/products',
    },
    {
      label: model!?.name,
      href: `/products/${id}`,
    },
    title,
  ]);

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm({
    model: model!,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

    if (data) {
      dispatch(notify(tc('successUpdated'), 'success'));
      if (document.referrer) {
        return router.back();
      }
      router.push(`/products/${id}`);
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    tc,
    tm,
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
