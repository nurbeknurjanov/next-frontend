import React, { PropsWithChildren } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { TranslationsProvider } from 'shared/wrappers/TranslationsProvider';
import { StoreProvider } from 'shared/wrappers/StoreProvider';

jest.mock('next-intl', () => {
  const messages = require('../../messages/en.json');
  const originalModule = jest.requireActual('next-intl');
  const NextIntlClientProvider = originalModule.NextIntlClientProvider;
  return {
    __esModule: true,
    ...originalModule,
    //default: () => 'mocked baz',
    NextIntlClientProvider: (props: PropsWithChildren) => (
      <NextIntlClientProvider locale={'en'} {...props} />
    ),
    useMessages: () => messages,
  };
});

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <TranslationsProvider>{children}</TranslationsProvider>;
};

export const renderWithProviders = (ui: React.ReactElement) => {
  return {
    ...rtlRender(ui, { wrapper: Wrapper }),
  };
};
