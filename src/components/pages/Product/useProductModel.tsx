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
    (id: string) => dispatch(getProductThunk(id)),
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getProduct(id);

      return () => {
        dispatch(products.getProduct.action.reset());
      };
    }
  }, [id, getProduct, dispatch]);

  return {
    model,
    getProductState,
  };
}
