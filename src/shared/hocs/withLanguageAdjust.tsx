import React, { FC, ComponentType } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { localeType } from '../../i18n';
require('dayjs/locale/ru');

export const withLanguageAdjust = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const { locale } = useParams();
    dayjs.locale(locale as localeType);

    return <Component {...props} />;
  };
  return NewComponent;
};
