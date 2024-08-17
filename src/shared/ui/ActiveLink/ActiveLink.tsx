import React, { FC, forwardRef } from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
//import { usePathname } from "next/navigation";
import { usePathname } from 'navigation';
import { LinkProps as MuiLinkProps } from '@mui/material';
import cn from 'classnames';
import styles from './activeLink.module.scss';
import { Link } from 'shared/ui';

export type Props = Omit<MuiLinkProps, 'href'> & NextLinkProps;
export const ActiveLink: FC<Props> = forwardRef<HTMLAnchorElement, Props>(
  ({ href, className, ...props }, ref) => {
    const pathName = usePathname();
    const hrefPathName = typeof href === 'string' ? href : href.pathname;
    const isActive = pathName === hrefPathName;
    return (
      <Link
        href={href}
        className={cn(className, { [styles.isActive]: isActive })}
        ref={ref}
        {...props}
      />
    );
  }
);

ActiveLink.displayName = 'ActiveLink';
