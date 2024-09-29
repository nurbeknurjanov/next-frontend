import React, { FC, ComponentType, useEffect } from 'react';
import { common } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';
import { getAuthStateSelector } from 'store/common/selectors';
import dayjs from 'dayjs';
import { localeType } from 'i18n';
import { useParams } from 'next/navigation';
import { withCleanPageData } from './withCleanPageData';
import { withMuiAdjust } from './withMuiAdjust';
import { withQueryErrorNotify } from './withQueryErrorNotify';
require('dayjs/locale/ru');

export const withPageWrapper = <T extends object>(
  Component: ComponentType<T>
) => {
  const CleanedComponent = withCleanPageData(Component);
  const MuiAdjustedComponent = withMuiAdjust(CleanedComponent);
  const WithErrorComponent = withQueryErrorNotify(MuiAdjustedComponent);
  const NewComponent: FC<T> = props => {
    const { locale } = useParams();
    dayjs.locale(locale as localeType);

    const dispatch = useAppDispatch();
    const { isAuth, newAccessToken } = useAppSelector(getAuthStateSelector);
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

      if (newAccessToken) {
        const domainSlices = window.location.hostname
          .split('.')
          .map(el => `.${el}`);
        const _baseDomain = `${domainSlices[domainSlices.length - 2] ?? ''}${domainSlices[domainSlices.length - 1]}`;
        setCookie('accessToken', newAccessToken, {
          path: '/',
          //domain: baseDomain,
          sameSite: 'lax',
        });
        dispatch(common.auth.actions.resetNewAccessToken());
      }
    }, [removeCookie, setCookie, isAuth, newAccessToken, dispatch]);

    return <WithErrorComponent {...props} />;
  };
  return NewComponent;
};
