'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { AppBarProps } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import styles from './header.module.scss';
import { styled } from '@mui/material/styles';
import { Link } from 'shared/ui';
import { LanguageSwitcher, UserMenu } from './components';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
  ({ theme }) => ({
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    '& .MuiIconButton-root': {
      margin: 0,
    },
  })
);

export const Header = () => (
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

      <UserMenu />
      <LanguageSwitcher />
    </Toolbar>
  </AppBarStyled>
);
