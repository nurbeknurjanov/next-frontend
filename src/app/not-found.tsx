import React from 'react';
import styles from 'css/page.module.scss';
import { useTranslations } from 'next-intl';

//async можно
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return <div className={styles.page}>{t('title')}</div>;
}
