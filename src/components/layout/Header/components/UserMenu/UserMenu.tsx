import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'shared/ui';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import { useUserMenu } from './useUserMenu';

export const UserMenu: FC = () => {
  const {
    tCommon,
    tProfilePage,
    tLoginPage,
    isAuth,
    authUser,
    onLogout,
    anchorEl,
    handleMenu,
    handleClose,
  } = useUserMenu();

  if (!isAuth) {
    return (
      <Link color="inherit" href={'/login'} mx={1}>
        {tLoginPage('title')}
      </Link>
    );
  }

  return (
    <>
      <Box sx={{ mx: 1 }} component={Link} href={'/profile'} color="inherit">
        {authUser!.name}
      </Box>
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
        <MenuItem
          component={Link}
          href={'/profile'}
          onClick={() => handleClose()}
        >
          <Person2Icon sx={{ mr: 1 }} />
          {tProfilePage('title')}
        </MenuItem>
        <MenuItem
          component={Link}
          href={'/'}
          onClick={() => {
            onLogout();
            handleClose();
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          {tCommon('logout')}
        </MenuItem>
      </Menu>
    </>
  );
};
