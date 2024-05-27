'use client';
import React from 'react';
import MuiLink from '@mui/material/Link';
import { usePathname, useRouter } from 'navigation';
import { useSearchParams, useParams } from 'next/navigation';
import { locales } from 'i18n';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  return (
    <>
      {locales
        .filter((el) => el !== locale)
        .map((el) => {
          const label = localesMap[el];
          return (
            <MuiLink
              key={el}
              color='inherit'
              onClick={() => {
                router.replace({ pathname, query }, { locale: el });
                router.refresh();
              }}
            >
              {label}
            </MuiLink>
          );
        })}
    </>
  );
};
