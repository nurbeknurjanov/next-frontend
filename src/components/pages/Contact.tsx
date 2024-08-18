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
    '66a4add57e9a28ee15ede391'
  );
  console.log('data', data);

  return <>{tContactPage('description', { phone: '996558011477' })}</>;
};

Contact = withPageWrapper(Contact);

export { Contact };
