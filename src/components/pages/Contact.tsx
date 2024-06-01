'use client';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { withCleanHooks } from 'shared/hocs';

let Contact: FC = () => {
  const t = useTranslations('ContactPage');
  useSetPageData(t('title'), [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: t('title'),
      href: '/contact',
    },
    t('title'),
  ]);

  return <>{t('description', { phone: '996558011477' })}</>;
};

Contact = withCleanHooks(Contact);

export { Contact };
