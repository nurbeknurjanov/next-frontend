import React, { FC, forwardRef } from 'react';
import MuiLink from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { LinkProps as MuiLinkProps } from '@mui/material';

type Props = Omit<MuiLinkProps, 'href'> & NextLinkProps;
export const Link: FC<Props> = forwardRef<HTMLAnchorElement, Props>(
  ({ href, ...props }, ref) => {
    return <MuiLink component={NextLink} href={href} ref={ref} {...props} />;
  }
);

Link.displayName = 'Link';
