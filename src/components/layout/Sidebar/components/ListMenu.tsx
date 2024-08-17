'use client';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ActiveLink } from 'shared/ui';
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

interface IProps {
  onClose?: () => void;
}
export function ListMenu({ onClose }: IProps) {
  const tCommon = useTranslations('Common');
  const tProductsPage = useTranslations('ProductsPage');
  const tUsersPage = useTranslations('UsersPage');
  const tFilesPage = useTranslations('FilesPage');
  const tContactPage = useTranslations('ContactPage');
  const router = useRouter();

  const isAuth = useAppSelector(getIsAuth);

  const closeHandler = () => {
    onClose && onClose();
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          component={ActiveLink}
          href={to({ pathname: '/' })}
          onClick={closeHandler}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={tCommon('home')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={ActiveLink}
          href={{ pathname: '/products' }}
          onClick={closeHandler}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={tProductsPage('title')} />
        </ListItemButton>
      </ListItem>
      {isAuth && (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={ActiveLink}
              href="/users"
              onClick={closeHandler}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={tUsersPage('title')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={ActiveLink}
              href="/files"
              onClick={closeHandler}
            >
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
          href={to({ pathname: '/contact', query: { fromSidebar: '1' } })}
          onClick={() => {
            router.push(
              to({ pathname: '/contact', query: { fromSidebar: '2' } })
            );
            closeHandler();
          }}
        >
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={tContactPage('title')} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
