'use client';
import React, { FC, useEffect } from 'react';
import { common } from 'store';
import { useAppDispatch } from 'store/hooks';
import { withCleanHooks } from 'shared/hocs';
import { useTranslations } from 'next-intl';

let Home: FC = () => {
  const t = useTranslations('HomePage');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(common.title.actions.set({ title: t('title') }));
    return () => {
      dispatch(common.title.actions.reset());
    };
  }, [dispatch, t]);
  return <>{t('description')}</>;
};

Home = withCleanHooks(Home);

export { Home };
