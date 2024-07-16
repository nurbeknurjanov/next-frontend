'use client';
import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ActiveLink } from 'shared/ui';
import styles from './siderbar.module.scss';
import { to } from 'shared/utils';
import { useAppSelector } from 'store/hooks';
import { getIsAuth } from 'store/common/selectors';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

export function Sidebar() {
  const tCommon = useTranslations('Common');
  const tProductsPage = useTranslations('ProductsPage');
  const tUsersPage = useTranslations('UsersPage');
  const tFilesPage = useTranslations('FilesPage');
  const tContactPage = useTranslations('ContactPage');
  const router = useRouter();
  const isAuth = useAppSelector(getIsAuth);
  return (
    <section className={styles.sidebar}>
      <Paper sx={{ height: '100%' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={ActiveLink} href={to({ pathname: '/' })}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={tCommon('home')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={ActiveLink} href="/products">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={tProductsPage('title')} />
            </ListItemButton>
          </ListItem>
          {!!'isAuth' && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={ActiveLink} href="/users">
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary={tUsersPage('title')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={ActiveLink} href="/files">
                  <ListItemIcon>
                    <AttachFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={tFilesPage('title')} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem disablePadding>
            <ListItemButton
              component={ActiveLink}
              href={to({ pathname: '/contact', search: { fromSidebar: '1' } })}
              onClick={() =>
                router.push(
                  to({ pathname: '/contact', search: { fromSidebar: '2' } })
                )
              }
            >
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={tContactPage('title')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </section>
  );
}
