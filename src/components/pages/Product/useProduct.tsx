'use client';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { useParams } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from './useProductModel';

export function useProduct() {
  const ts = useTranslations('ProductsPage');
  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });
  const title = model?.name!;

  useSetPageData(title, [
    {
      label: ts('title'),
      href: '/products',
    },
    title,
  ]);

  return {
    model,
    getProductState,
  };
}
