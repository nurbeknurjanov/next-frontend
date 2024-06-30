'use client';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from './useProductModel';
import { useState } from 'react';

type ModalType = { type: 'delete'; id: string };
export function useProduct() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });

  return {
    model,
    getProductState,
    showModal,
    setShowModal,
    router,
  };
}
