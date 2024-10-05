import React, { FC, ComponentType, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuthStateSelector } from 'store/common/selectors';
import { useCookies } from 'react-cookie';

export const withHandleAccessToken = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const dispatch = useAppDispatch();

    const { isAuth, accessToken } = useAppSelector(getAuthStateSelector);
    const [, setCookie, removeCookie] = useCookies([
      'refreshToken',
      'accessToken',
    ]);

    useEffect(() => {
      if (!isAuth) {
        removeCookie('refreshToken', { path: '/' });
        removeCookie('accessToken', { path: '/' });
        return;
      }

      if (accessToken) {
        const domainSlices = window.location.hostname
          .split('.')
          .map(el => `.${el}`);
        const _baseDomain = `${domainSlices[domainSlices.length - 2] ?? ''}${domainSlices[domainSlices.length - 1]}`;
        setCookie('accessToken', accessToken, {
          path: '/',
          //domain: baseDomain,
          sameSite: 'lax',
        });
      }
    }, [dispatch, removeCookie, setCookie, isAuth, accessToken]);

    return <Component {...props} />;
  };
  return NewComponent;
};
