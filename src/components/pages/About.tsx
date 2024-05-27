'use client';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import { serverStore } from 'store/store';
import { useTranslations } from 'next-intl';
import { withCleanHooks } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';

let About: FC = () => {
  const t = useTranslations('AboutPage');
  const title = useAppSelector(common.title.selector.title);

  useSetPageData(t('title'), [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About us',
      href: '/about',
    },
    'About us',
  ]);

  return (
    <>
      server title: {serverStore.getState().common.title.title}
      <br />
      client title: {title}
      <br />
      client text: {t('description')}
    </>
  );
};

About = withCleanHooks(About);

export { About };
