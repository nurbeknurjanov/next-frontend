'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'navigation';
import { useSearchParams, useParams } from 'next/navigation';
import { localeType } from 'i18n';
import dayjs from 'dayjs';
require('dayjs/locale/ru');

export const useLanguageSwitcher = () => {
  /*let url = new URL("https://example.com?foo[]=1&foo[]=2&bar=2");
    //let url = new URL("https://example.com?foo=1&foo=2&bar=2");
    //let params = new URLSearchParams(url.search);
    let params = new URLSearchParams(url.search.replaceAll('[]',''));

    //Add a second foo parameter.
    //params.append("foo", 4);
    //console.log(params.getAll("foo")); //Prints ["1","4"].
    */

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

  return {
    anchorEl,
    handleMenu,
    handleClose,
    locale,
    router,
    pathname,
    query,
  };
};
