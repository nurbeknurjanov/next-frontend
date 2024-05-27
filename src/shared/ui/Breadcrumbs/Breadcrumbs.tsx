'use client';
import * as React from 'react';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import { Link } from 'shared/ui';

export function Breadcrumbs() {
  const _theme = useTheme();
  const breadcrumbsState = useAppSelector(common.breadcrumbs.selector.state);
  const { items } = breadcrumbsState;

  if (!items.length) {
    return null;
  }

  return (
    <MuiBreadcrumbs>
      <Link underline="hover" color="inherit" href={'/'}>
        Home
      </Link>
      {items.map((el, index) => {
        if (typeof el === 'string') {
          return <span key={index}>{el}</span>;
        }

        if (el.label) {
          return (
            <Link key={index} underline="hover" color="inherit" href={el.href}>
              {el.label}
            </Link>
          );
        }
      })}
    </MuiBreadcrumbs>
  );
}
