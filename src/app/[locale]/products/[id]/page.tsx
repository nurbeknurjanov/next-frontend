import React from 'react';
import { Product } from 'components/pages';
import { serverStore } from 'store/store';
import type { PageProps } from 'app/types';
import { headers } from 'next/headers';
import { setServerWait, setTitle } from 'store/common/thunks';
import { getTranslations } from 'next-intl/server';
import { getProductThunk } from 'store/products/thunks';
import { notFound } from 'next/navigation';

export interface ProductPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const headersList = headers();

  if (headersList.get('Referer') === null) {
    serverStore.dispatch(setServerWait(true));

    const t = await getTranslations('ProductPage');

    const { data: model } = await serverStore.dispatch(getProductThunk(id));
    if (!model) {
      return notFound();
    }

    serverStore.dispatch(setTitle(`${t('title')} - ${model!.name}`));

    serverStore.dispatch(setServerWait(false));
  }

  return <Product />;
}
