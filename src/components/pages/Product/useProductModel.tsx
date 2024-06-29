'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { getProductThunk } from 'store/products/thunks';

export function useProductModel({ id }: { id: string }) {
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
    if (!document.referrer) return;

    if (id) {
      getProduct(id);
    }
  }, [id, getProduct, dispatch]);

  useEffect(() => {
    return () => {
      if (!document.referrer) return;

      dispatch(products.getProduct.action.reset());
    };
  }, [dispatch]);

  return {
    model,
    getProductState,
  };
}
