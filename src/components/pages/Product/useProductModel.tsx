'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { getProductThunk } from 'store/products/thunks';
import { useHydratedClient } from 'shared/hooks';

export function useProductModel({ id }: { id: string }) {
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
  }, [id, getProduct, dispatch, isHydratedToClientRef]);

  useEffect(() => {
    return () => {
      if (!isHydratedToClientRef.current) return;

      dispatch(products.getProduct.action.reset());
    };
  }, [dispatch, isHydratedToClientRef]);

  return {
    model,
    getProductState,
  };
}
