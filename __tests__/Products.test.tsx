import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Products } from 'components/pages/Products';

describe('Home', () => {
  it('renders a heading', async () => {
    const { container, getByRole: _getByRole } = renderWithProviders(
      <Products />
    );

    expect(container).toMatchSnapshot();
    //_container.querySelector()
    //const Product1 = await screen.findByText('Product 1');
    //const Product1 = await waitFor(() => screen.getByText('Product'));
    await waitFor(() => {
      expect(screen.getByText('Product')).toBeInTheDocument();
    });
    //const noData = await screen.findByText('No rows');
  });
});
