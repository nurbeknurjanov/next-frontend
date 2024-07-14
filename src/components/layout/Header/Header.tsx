'use client';
import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { AppBarProps } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import styles from './header.module.scss';
import { styled } from '@mui/material/styles';
import { Link } from 'shared/ui';
import { LanguageSwitcher } from './components';
import { getAccessTokenThunk, logout } from 'store/common/thunks';
import { getAuthState, getAuthUser } from 'store/common/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
  ({ theme }) => ({
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    '&.MuiPaper-root': {},
  })
);

export const Header = () => {
  const { isAuth, user: _authUser } = useAppSelector(getAuthState);
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

  return (
    <AppBarStyled position="static" component={'header'}>
      <Toolbar>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </Link>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className={styles.slogan}
        >
          Hello {authUser ? authUser.name : 'Guest'}
        </Typography>

        {isAuth ? (
          <Link color="inherit" href={'/'} onClick={onLogout} mx={1}>
            Logout
          </Link>
        ) : (
          <Link color="inherit" href={'/login'} mx={1}>
            Login
          </Link>
        )}

        <LanguageSwitcher />

        <IconButton size="large" edge={'end'} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBarStyled>
  );
};
