'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { UserPageProps } from 'app/[locale]/users/[id]/page';
import { useGetUserByIdQuery } from 'api/users';
import { skipToken } from '@reduxjs/toolkit/query';

export function useUser() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const { id } = useParams<UserPageProps['params']>();
  const { data, isFetching } = useGetUserByIdQuery(id ?? skipToken);

  return {
    tCommon,
    tUser,
    tUsersPage,
    model: data,
    isFetching,
  };
}
