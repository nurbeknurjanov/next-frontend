import { common } from 'store';
import { useAppSelector } from 'store/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

export const useHydrateStateOnce = (): boolean => {
  const dispatch = useAppDispatch();

  const isServerStoreActual = useAppSelector(
    common.hydrate.selector.isServerStoreActual
  );

  useEffect(() => {
    dispatch(common.hydrate.actions.setIsServerStoreActual(false));
  }, [dispatch]);

  return isServerStoreActual;
};
