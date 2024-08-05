import React, { PropsWithChildren } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { TranslationsProvider } from 'shared/wrappers/TranslationsProvider';
import { serverStore } from 'store/store';
import { StoreProvider } from 'shared/wrappers/StoreProvider';
import {
  PathnameContext,
  SearchParamsContext,
  PathParamsContext,
} from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createMockRouter } from 'tests/mocks/createMockRouter';

const mockRouter: AppRouterInstance = createMockRouter();
/*jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useParams: () => ({ locale: 'en' }),
    usePathname: () => '/products',
    useRouter: () => mockRouter,
    useSearchParams: () => ({
      get: () => null,
      entries: () => Object.entries({ pageIndex: 0, pageSize: 12 }),
    }),
  };
});*/

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

const RouterWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PathParamsContext.Provider value={{ locale: 'en' }}>
      <PathnameContext.Provider value={'/products'}>
        <SearchParamsContext.Provider
          value={new URLSearchParams('pageSize=12&pageIndex=0')}
        >
          <AppRouterContext.Provider value={mockRouter}>
            {children}
          </AppRouterContext.Provider>
        </SearchParamsContext.Provider>
      </PathnameContext.Provider>
    </PathParamsContext.Provider>
  );
};

const CommonWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TranslationsProvider>
      <StoreProvider initialState={{ ...serverStore.getState() }}>
        <RouterWrapper>{children}</RouterWrapper>
      </StoreProvider>
    </TranslationsProvider>
  );
};

export const renderWithProviders = (ui: React.ReactElement) => {
  return {
    ...rtlRender(ui, { wrapper: CommonWrapper }),
  };
};
