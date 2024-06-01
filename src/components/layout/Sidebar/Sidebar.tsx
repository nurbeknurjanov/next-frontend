'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { ActiveLink } from 'shared/ui';
import styles from './siderbar.module.scss';
import { to } from 'shared/utils';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';

export function Sidebar() {
  const { isAuth } = useAppSelector(common.login.selector.state);
  return (
    <section className={styles.sidebar}>
      <Paper sx={{ height: '100%' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={ActiveLink} href={to({ pathname: '/' })}>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={ActiveLink} href="/products">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Products'} />
            </ListItemButton>
          </ListItem>
          {/*<ListItem disablePadding>
            <ListItemButton component={ActiveLink} href="/manual">
              <ListItemText primary={"Manual"} />
            </ListItemButton>
          </ListItem>*/}
          {/*<ListItem disablePadding>
            <ListItemButton
              component={ActiveLink}
              href="/about"
              onClick={() =>
                router.push(
                  to({ pathname: '/about', search: { page: 'about' } })
                )
              }
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'About us'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={ActiveLink} href="/contact">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Contact'} />
            </ListItemButton>
          </ListItem>*/}
          {isAuth && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={ActiveLink} href="/users">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Users'} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={ActiveLink} href="/files">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Files'} />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/*<ListItem disablePadding>
            <ListItemButton
              component={ActiveLink}
              href={to({ pathname: "/product/2", search: { name: "Nurbek" } })}
              onClick={() =>
                router.push(
                  to({ pathname: "/product/3", search: { name: "Nurbek" } }),
                )
              }
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Product"} />
            </ListItemButton>
          </ListItem>*/}
        </List>
      </Paper>
    </section>
  );
}
