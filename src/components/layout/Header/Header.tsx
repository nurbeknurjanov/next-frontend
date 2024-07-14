'use client';
import React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHeader } from './useHeader';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
  ({ theme }) => ({
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    '&.MuiPaper-root': {},
  })
);

export const Header = () => {
  const { isAuth, onLogout } = useHeader();
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
        ></Typography>

        {isAuth ? (
          <Link color="inherit" href={'/'} onClick={onLogout} mx={1}>
            Logout
          </Link>
        ) : (
          <Link color="inherit" href={'/login'} mx={1}>
            Login
          </Link>
        )}

        <IconButton
          size="large"
          edge={'end'}
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>

        <LanguageSwitcher />
      </Toolbar>
    </AppBarStyled>
  );
};
