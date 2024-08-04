import React, { FC, PropsWithChildren } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export const TranslationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={'en'} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
