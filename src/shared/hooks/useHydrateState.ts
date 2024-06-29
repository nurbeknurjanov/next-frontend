import { common } from 'store';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useEffect } from 'react';
import { hydratedToClient } from 'store/common/thunks';

export const useHydrateState = (): boolean => {
  const dispatch = useAppDispatch();

  const isHydratedToClient = useAppSelector(
    common.hydrate.selector.isHydratedToClient
  );

  useEffect(() => {
    dispatch(hydratedToClient(true));
  }, [dispatch]);

  return isHydratedToClient;
};
