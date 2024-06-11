'use client';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { useParams } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from '../Product';
import { Button } from 'shared/ui';
import React, { useState } from 'react';

type ModalType = { type: 'delete'; id: string };
export function useProductUpdate() {
  const ts = useTranslations('ProductsPage');
  const tp = useTranslations('ProductPage');
  const title = tp('update');
  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });

  useSetPageData(
    title,
    [
      {
        label: ts('title'),
        href: '/products',
      },
      {
        label: model!?.name,
        href: `/products/${id}`,
      },
      title,
    ],
    <Button
      variant={'contained'}
      size={'small'}
      color={'error'}
      onClick={() => setShowModal({ type: 'delete', id })}
    >
      {tp('delete')}
    </Button>
  );

  return {
    model,
    getProductState,
    showModal,
    setShowModal,
  };
}
