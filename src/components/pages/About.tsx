'use client';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
//import { serverStore } from 'store/store';
import { useTranslations } from 'next-intl';
import { withCleanHooks } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';

let About: FC = () => {
  const tAboutPage = useTranslations('AboutPage');
  const title = useAppSelector(common.title.selector.title)!;
  //serverStore.getState().common.title.title

  useSetPageData(title, [title]);

  return <>{tAboutPage('description')}</>;
};

About = withCleanHooks(About);

export { About };
