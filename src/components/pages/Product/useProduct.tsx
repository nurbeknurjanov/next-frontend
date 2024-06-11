'use client';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { useParams } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from './useProductModel';
import { Button } from '../../../shared/ui';
import React, { useState } from 'react';

type ModalType = { type: 'delete'; id: string };
export function useProduct() {
  const ts = useTranslations('ProductsPage');
  const tp = useTranslations('ProductPage');
  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });
  const title = model?.name!;

  useSetPageData(
    title,
    [
      {
        label: ts('title'),
        href: '/products',
      },
      title,
    ],
    <Button
      variant={'contained'}
      size={'small'}
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
