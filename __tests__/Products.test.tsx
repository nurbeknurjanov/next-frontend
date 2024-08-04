import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen } from '@testing-library/react';
import { Products } from 'components/pages/Products';

describe('Home', () => {
  it('renders a heading', () => {
    const { container: _container, getByRole: _getByRole } =
      renderWithProviders(<Products />);

    //_container.querySelector()
  });
});
