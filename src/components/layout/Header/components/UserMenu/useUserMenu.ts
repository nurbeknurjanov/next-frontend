'use client';
import React, { useEffect } from 'react';
import { getAccessTokenThunk, logout } from 'store/common/thunks';
import { getAuthStateSelector, getAuthUser } from 'store/common/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export const useUserMenu = () => {
  const { isAuth, user: _authUser } = useAppSelector(getAuthStateSelector);
  const authUser = useAppSelector(getAuthUser);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [_cookies, setCookie, removeCookie] = useCookies([
    'refreshToken',
    'accessToken',
  ]);

  const onLogout = () => {
    dispatch(logout());
    removeCookie('refreshToken');
    removeCookie('accessToken');
    router.push('/');
  };

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isAuth) {
      interval = setInterval(async () => {
        const { data, error } = await dispatch(
          getAccessTokenThunk({ config: { withCredentials: true } })
        );

        if (error && error.status === 401) {
          removeCookie('refreshToken');
          removeCookie('accessToken');
          router.push('/login');
        }

        if (data) {
          setCookie('accessToken', data, { path: '/' });
        }
      }, 30 * 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [dispatch, isAuth, setCookie, removeCookie, router]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { isAuth, onLogout, anchorEl, handleMenu, handleClose };
};
