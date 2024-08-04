import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { HomeDummy } from 'components/pages/HomeDummy';
import { StoreProvider } from 'shared/wrappers/StoreProvider';
import { TranslationsProvider } from 'shared/wrappers/TranslationsProvider';

jest.mock('next-intl', () => {
  const messages = require('../messages/en.json');
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

describe('Home', () => {
  it('renders a heading', () => {
    const { container: _container, getByRole: _getByRole } = render(
      <TranslationsProvider>
        <HomeDummy />
      </TranslationsProvider>,
      { wrapper: StoreProvider }
    );

    //_container.querySelector()

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome');
  });
});
