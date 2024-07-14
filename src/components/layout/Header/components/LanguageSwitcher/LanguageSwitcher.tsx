'use client';
import React from 'react';
import { locales } from 'i18n';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLanguageSwitcher } from './useLanguageSwitcher';

const localesMap = {
  en: 'English',
  ru: 'Русский',
};
export const LanguageSwitcher = () => {
  const { anchorEl, handleMenu, handleClose, locale, router, pathname, query } =
    useLanguageSwitcher();
  return (
    <>
      <IconButton
        size="large"
        edge={'end'}
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        <LanguageIcon />
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
        {locales
          .filter(el => el !== locale)
          .map(el => {
            const label = localesMap[el];
            return (
              <MenuItem
                key={el}
                onClick={() => {
                  router.replace({ pathname, query }, { locale: el });
                  router.refresh();
                  handleClose();
                }}
              >
                {label}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};
