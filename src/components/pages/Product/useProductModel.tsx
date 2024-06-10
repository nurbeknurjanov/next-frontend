'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { products } from 'store';
import { getProductThunk } from 'store/products/thunks';
import { useHydrateState } from 'shared/hooks';

export function useProductModel({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const getProductState = useAppSelector(products.getProduct.selector.state);
  const model = getProductState.data;

  const isHydratedToClient = useHydrateState();

  const getProduct = useCallback(
    async (id: string) => {
      await dispatch(getProductThunk(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isHydratedToClient) return;

    if (id) {
      getProduct(id);
    }
  }, [id, getProduct, dispatch, isHydratedToClient]);

  useEffect(() => {
    return () => {
      if (!isHydratedToClient) return;

      dispatch(products.getProduct.action.reset());
    };
  }, [dispatch, isHydratedToClient]);

  return {
    model,
    getProductState,
  };
}
