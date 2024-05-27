import { common } from 'store';
import { useAppSelector } from 'store/hooks';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'store/hooks';

export const useHydrateState = (): boolean => {
  const dispatch = useAppDispatch();

  const isServerStoreActual = useAppSelector(
    common.hydrated.selector.isServerStoreActual
  );
  const isServerStoreActualRef = useRef(isServerStoreActual);

  useEffect(() => {
    dispatch(common.hydrated.actions.setIsServerStoreActual(false));
    isServerStoreActualRef.current = false;
  }, [dispatch]);

  return isServerStoreActualRef.current;
};
