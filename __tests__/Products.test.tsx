import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen } from '@testing-library/react';
import { HomeDummy } from 'components/pages/HomeDummy';

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
