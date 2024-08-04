import React, { PropsWithChildren } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { TranslationsProvider } from 'shared/wrappers/TranslationsProvider';

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

export const renderWithProviders = (ui: React.ReactElement) => {
  return {
    ...rtlRender(ui, { wrapper: TranslationsProvider }),
  };
};