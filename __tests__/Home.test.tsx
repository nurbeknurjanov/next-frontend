import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { HomeDummy } from 'components/pages/HomeDummy';
import { StoreProvider } from 'shared/wrappers/StoreProvider';
import { renderWithProviders } from 'tests';

describe('Home', () => {
  it('renders a heading', () => {
    const { container: _container, getByRole: _getByRole } =
      renderWithProviders(<HomeDummy />);

    //_container.querySelector()

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome');
  });
});
