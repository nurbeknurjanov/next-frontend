import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'shared/ui';
import { useUserMenu } from './useUserMenu';

export const UserMenu: FC = () => {
  const { isAuth, onLogout, anchorEl, handleMenu, handleClose } = useUserMenu();
  return (
    <>
      {/*<Link color="inherit" href={'/login'} mx={1}>
        Login
      </Link>*/}

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
        {isAuth ? (
          <MenuItem
            onClick={() => {
              onLogout();
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} component={Link} href={'/login'}>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
