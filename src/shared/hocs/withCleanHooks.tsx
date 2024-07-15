import React, { FC, ComponentType, useEffect } from 'react';
import { common } from 'store';
import { hydratedToClient } from 'store/common/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';
import { getAuthStateSelector } from 'store/common/selectors';

export const withCleanHooks = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const dispatch = useAppDispatch();
    const { isAuth, newAccessToken } = useAppSelector(getAuthStateSelector);
    const [, setCookie, removeCookie] = useCookies([
      'refreshToken',
      'accessToken',
    ]);

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

    useEffect(() => {
      if (!isAuth) {
        removeCookie('refreshToken', { path: '/' });
        removeCookie('accessToken', { path: '/' });
        return;
      }
      if (newAccessToken) {
        setCookie('accessToken', newAccessToken, { path: '/' });
        dispatch(common.auth.actions.resetNewAccessToken());
      }
    }, [removeCookie, setCookie, isAuth, newAccessToken, dispatch]);

    return <Component {...props} />;
  };
  return NewComponent;
};
