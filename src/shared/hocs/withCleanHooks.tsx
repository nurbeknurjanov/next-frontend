import React, { FC, ComponentType, useEffect } from 'react';
import { common } from 'store';
import { useAppDispatch } from 'store/hooks';

export const withCleanHooks = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const dispatch = useAppDispatch();

    useEffect(
      () => () => {
        dispatch(common.breadcrumbs.actions.reset());
        dispatch(common.title.actions.reset());
        dispatch(common.pageTopContentButtons.actions.reset());

        dispatch(common.hydrated.actions.setIsServerStoreActual(false));
      },
      [dispatch]
    );

    return <Component {...props} />;
  };
  return NewComponent;
};
