'use client';
import { sexOptions, SEX_ENUM } from 'api/usersApi';
import { useTranslations } from 'next-intl';

export function useTranslatedData() {
  const tUser = useTranslations('User');

  sexOptions[SEX_ENUM.MALE] = tUser('sexOptions.male');
  sexOptions[SEX_ENUM.FEMALE] = tUser('sexOptions.female');

  return {
    sexOptions,
  };
}
