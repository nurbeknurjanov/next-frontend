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
        dispatch(common.buttonsContent.actions.reset());
      },
      [dispatch]
    );

    return <Component {...props} />;
  };
  return NewComponent;
};
