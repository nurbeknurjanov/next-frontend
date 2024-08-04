import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { PreloadedState as ReduxPreloadedState } from '@reduxjs/toolkit';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { PartialDeep } from 'type-fest';
import { AppStore, makeStore, ReduxState } from 'store';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { NextRouter } from 'next/router';

type ExtendedRenderOptions = RenderOptions & {
  locale?: string;
  preloadedState?: ReduxPreloadedState<PartialDeep<ReduxState>>;
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { locale = 'en', preloadedState = {} }: ExtendedRenderOptions = {}
) => {
  return {
    store,
    wrapper: Wrapper,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
