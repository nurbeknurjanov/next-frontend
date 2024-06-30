'use client';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { useParams } from 'next/navigation';
import { UserPageProps } from 'app/[locale]/users/[id]/page';
import { useUserModel } from './useUserModel';

export function useUser() {
  const tUsersPage = useTranslations('UsersPage');
  const { id } = useParams<UserPageProps['params']>();
  const { model, getUserState } = useUserModel({ id });
  const title = model?.name!;

  useSetPageData(title, [
    {
      label: tUsersPage('title'),
      href: '/users',
    },
    title,
  ]);

  return {
    model,
    getUserState,
  };
}
