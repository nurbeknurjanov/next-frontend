'use client';
import * as React from 'react';
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
import { common } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCookies } from 'react-cookie';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
  ({ theme }) => ({
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    '&.MuiPaper-root': {},
  })
);

export const Header = () => {
  const { isAuth, user } = useAppSelector(common.login.selector.state);
  const dispatch = useAppDispatch();
  const [, setCookie, _removeCookie] = useCookies(['accessToken']);

  const logout = () => {
    dispatch(common.login.actions.reset());
    setCookie('accessToken', '', { path: '/' });
  };

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
          Hello {user ? user.name : 'Guest'}
        </Typography>

        {isAuth ? (
          <Link color="inherit" href={'/'} onClick={logout} mx={1}>
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
