'use client';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppSelector } from 'store/hooks';
import { getProductsPermissionsStateSelector } from 'store/products/selectors';
import { useGetProductByIdQuery } from 'api/products';
import { skipToken } from '@reduxjs/toolkit/query';

type ModalType = { type: 'delete'; id: string };
export function useProduct() {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');
  const tProductsPage = useTranslations('ProductsPage');

  const router = useRouter();

  const productsPermissions = useAppSelector(
    getProductsPermissionsStateSelector
  );

  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { data: model, isFetching } = useGetProductByIdQuery(id ?? skipToken);

  return {
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    model,
    isFetching,
    showModal,
    setShowModal,
    router,
    productsPermissions,
  };
}
