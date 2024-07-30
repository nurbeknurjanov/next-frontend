'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import { AppBarProps } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Image from 'next/image';
import styles from './header.module.scss';
import NextSVG from '../../../../public/next.svg';
import { styled } from '@mui/material/styles';
import { Link } from 'shared/ui';
import { LanguageSwitcher, UserMenu } from './components';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Sidebar } from '../Sidebar';
import { useHeader } from './useHeader';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
  ({ theme }) => ({
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    '& .MuiIconButton-root': {
      margin: 0,
    },
  })
);

export const Header = () => {
  const { showSidebar, setShowSidebar } = useHeader();
  return (
    <>
      <AppBarStyled position="static" component={'header'}>
        <Toolbar>
          <Link href="/" className={styles.logoLink}>
            <NextSVG alt="Next" className={styles.logo} />
          </Link>
          <IconButton
            size="large"
            edge={'start'}
            color="inherit"
            onClick={() => setShowSidebar(true)}
          >
            <MenuIcon />
          </IconButton>

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
      <Drawer open={showSidebar} onClose={() => setShowSidebar(false)}>
        <Sidebar />
      </Drawer>
    </>
  );
};
