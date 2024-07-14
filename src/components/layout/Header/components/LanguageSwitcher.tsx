'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'navigation';
import { useSearchParams, useParams } from 'next/navigation';
import { locales, localeType } from 'i18n';
import dayjs from 'dayjs';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
require('dayjs/locale/ru');

export const LanguageSwitcher = () => {
  /*let url = new URL("https://example.com?foo[]=1&foo[]=2&bar=2");
    //let url = new URL("https://example.com?foo=1&foo=2&bar=2");
    //let params = new URLSearchParams(url.search);
    let params = new URLSearchParams(url.search.replaceAll('[]',''));

    //Add a second foo parameter.
    //params.append("foo", 4);
    //console.log(params.getAll("foo")); //Prints ["1","4"].
    */
  const localesMap = {
    en: 'English',
    ru: 'Русский',
  };

  const { locale } = useParams();
  useEffect(() => {
    dayjs.locale(locale as localeType);
  }, [locale]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
