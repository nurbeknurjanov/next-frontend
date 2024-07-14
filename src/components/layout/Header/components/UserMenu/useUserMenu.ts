'use client';
import React from 'react';
import { logout } from 'store/common/thunks';
import { getAuthStateSelector, getAuthUser } from 'store/common/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';
import { useTranslations } from 'next-intl';

export const useUserMenu = () => {
  const tCommon = useTranslations('Common');
  const tLoginPage = useTranslations('LoginPage');
  const { isAuth, user: _authUser } = useAppSelector(getAuthStateSelector);
  const authUser = useAppSelector(getAuthUser);

  const dispatch = useAppDispatch();
  const [_cookies, _setCookie, removeCookie] = useCookies([
    'refreshToken',
    'accessToken',
  ]);

  const onLogout = () => {
    dispatch(logout());
    removeCookie('refreshToken');
    removeCookie('accessToken');
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    tCommon,
    tLoginPage,
    isAuth,
    authUser,
    onLogout,
    anchorEl,
    handleMenu,
    handleClose,
  };
};
