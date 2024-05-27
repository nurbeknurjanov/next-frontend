import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { useSetPageData, useHydrateState } from 'shared/hooks';
import { getAggStates } from 'store/common/types';
import { useParams } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { getProductThunk } from 'store/products/thunks';

export function useProduct() {
  const isServerStoreActual = useRef<boolean>();
  isServerStoreActual.current = useHydrateState();
  const dispatch = useAppDispatch();
  const ts = useTranslations('ProductsPage');
  const { id } = useParams<ProductPageProps['params']>();

  const productState = useAppSelector(products.getProduct.selector.state);
  const aggStates = getAggStates(productState);

  const model = productState.data;
  const title = model?.name || '';

  useSetPageData(title, [
    {
      label: ts('title'),
      href: '/products',
    },
    title,
  ]);

  const getProduct = useCallback(
    (id: string) => dispatch(getProductThunk(id)),
    [dispatch]
  );

  useEffect(() => {
    if (isServerStoreActual.current) return;

    if (id) {
      getProduct(id);
    }
  }, [dispatch, getProduct, id]);

  useEffect(
    () => () => {
      if (isServerStoreActual.current) return;

      dispatch(products.getProduct.action.reset());
    },
    [dispatch]
  );

  return {
    model,
    aggStates,
  };
}
