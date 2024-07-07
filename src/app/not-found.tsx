import React from 'react';
import { useTranslations } from 'next-intl';

//async можно
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return <>{t('title')}</>;
}
