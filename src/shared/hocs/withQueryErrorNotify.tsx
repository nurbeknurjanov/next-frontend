import React, { FC, ComponentType, useEffect } from 'react';
import { common } from 'store';
import { notify } from 'store/common/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const withQueryErrorNotify = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const dispatch = useAppDispatch();

    const { error } = useAppSelector(common.queryError.selector.state);
    useEffect(() => {
      if (error) {
        dispatch(notify(error.data.message, 'error'));
      }
    }, [error, dispatch]);

    return <Component {...props} />;
  };

  return NewComponent;
};
