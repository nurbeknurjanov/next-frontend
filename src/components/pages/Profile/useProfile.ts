'use client';
import { useTranslations } from 'next-intl';
import { useAppSelector } from 'store/hooks';
import { getAuthUser } from 'store/common/selectors';

export function useProfile() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const model = useAppSelector(getAuthUser);

  return {
    tCommon,
    tUser,
    tUsersPage,
    model,
  };
}
