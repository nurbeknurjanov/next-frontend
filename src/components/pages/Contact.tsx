'use client';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { withPageWrapper } from 'shared/hocs';
import { useGetUserByIdQuery } from 'api/rtkQuery/rtkQuery';

let Contact: FC = () => {
  const tContactPage = useTranslations('ContactPage');
  useSetPageData(tContactPage('title'), [tContactPage('title')]);

  const { data, error, isLoading } = useGetUserByIdQuery(
    '66c20d6a473ee51e08f7f804'
  );
  console.log('data', data);

  return <>{tContactPage('description', { phone: '996558011477' })}</>;
};

Contact = withPageWrapper(Contact);

export { Contact };
