'use client';
import React from 'react';
import styles from 'css/page.module.scss';
import { useTranslations } from 'next-intl';

//error not support async, and it must be client

/* eslint-disable */
// eslint-disable-next-line
export default function ErrorPage(props: { error: string }) {
  const t = useTranslations('ErrorPage');
  return <div className={styles.page}>{t('title')}</div>;
}
/* eslint-enable */
