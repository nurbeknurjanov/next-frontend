import React from 'react';
import styles from 'css/page.module.scss';
import { Home } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';

//eslint-disable-next-line
export default async function HomePage(props: PageProps) {
  //console.log("json data", (await import(`../../messages/ru.json`)).default);
  const t = await getTranslations('HomePage');

  async function someFetch() {
    'use server';
  }

  someFetch();

  serverStore.dispatch(common.title.actions.set({ title: t('title') }));
  return (
    <div className={styles.page}>
      <Home />
    </div>
  );
}
