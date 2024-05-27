import React from 'react';
import styles from 'css/page.module.scss';
import { About } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { useTranslations } from 'next-intl';

//eslint-disable-next-line
export default function AboutPage(props: PageProps) {
  const t = useTranslations('AboutPage');
  serverStore.dispatch(common.title.actions.set({ title: t('title') }));

  return (
    <div className={styles.page}>
      <p>Seo title {serverStore.getState().common.title.title}</p>
      <p>Seo text: {t('description')}</p>
      <About />
    </div>
  );
}
