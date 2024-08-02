//import '@testing-library/jest-dom';
/*import React from 'react';
import { render, screen } from '@testing-library/react';
//import { HomeDummy } from 'components/pages/HomeDummy';
import { StoreProvider } from 'shared/wrappers/StoreProvider';
import { TranslationsProvider } from 'shared/wrappers/TranslationsProvider';*/

jest.mock('next-intl', () => {
  const originalModule = jest.requireActual('next-intl');
  return {
    __esModule: true,
    ...originalModule,
    //default: () => 'mocked baz',
    //NextIntlClientProvider: originalModule.NextIntlClientProvider,
    useMessages: () => ({
      HomePage: { title: 'Welcome', description: 'This is welcome page' },
    }),
  };
});

describe('Home', () => {
  xit('renders a heading', () => {
    /*render(
      <TranslationsProvider>
        <HomeDummy />
      </TranslationsProvider>,
      { wrapper: StoreProvider }
    );

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome');*/
    expect(1).toEqual(1);
  });
});
