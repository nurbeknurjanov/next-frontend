import React, { FC, ComponentType, useEffect } from 'react';
import { common } from 'store';
import { hydratedToClient } from 'store/common/thunks';
import { useAppDispatch } from 'store/hooks';

export const withCleanPageData = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const dispatch = useAppDispatch();

    useEffect(
      () => () => {
        dispatch(common.breadcrumbs.actions.reset());
        dispatch(common.title.actions.reset());
        dispatch(common.buttonsContent.actions.reset());

        setTimeout(() => {
          dispatch(hydratedToClient(true));
        }, 0);
      },
      [dispatch]
    );

    return <Component {...props} />;
  };
  return NewComponent;
};
