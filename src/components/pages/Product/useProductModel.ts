'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { getProductThunk } from 'store/products/thunks';
import { useHydratedClient } from 'shared/hooks';
import { useTranslations } from 'next-intl';

export function useProductModel({ id }: { id: string }) {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');

  const isHydratedToClientRef = useHydratedClient();

  const dispatch = useAppDispatch();
  const getProductState = useAppSelector(products.getProduct.selector.state);
  const model = getProductState.data;

  const getProduct = useCallback(
    async (id: string) => {
      await dispatch(getProductThunk(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isHydratedToClientRef.current) return;

    if (id) {
      getProduct(id);
    }
  }, [id, getProduct, isHydratedToClientRef]);

  useEffect(
    () => () => {
      if (!isHydratedToClientRef.current) return;

      dispatch(products.getProduct.action.reset());
    },
    [dispatch, isHydratedToClientRef]
  );

  return {
    tCommon,
    tProduct,
    tProductPage,
    model,
    getProductState,
  };
}
