'use client';
import { useTranslations } from 'next-intl';
import { IUser } from 'api/usersApi';

export function useProfile() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const model = {} as IUser;

  return {
    tCommon,
    tUser,
    tUsersPage,
    model,
  };
}
