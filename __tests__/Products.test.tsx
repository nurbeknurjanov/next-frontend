import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen } from '@testing-library/react';
import { Products } from 'components/pages/Products';

describe('Home', () => {
  it('renders a heading', async () => {
    const { container, getByRole: _getByRole } = renderWithProviders(
      <Products />
    );

    expect(container).toMatchSnapshot();
    //_container.querySelector()
    //const noData = await screen.findByText('No data');
  });
});
