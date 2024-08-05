import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen, waitFor /*, act */ } from '@testing-library/react';
import { Products } from 'components/pages/Products';

describe('Home', () => {
  it('renders a heading', async () => {
    const { container, getByText: _getByText } = renderWithProviders(
      <Products />
    );

    //expect(container).toMatchSnapshot();
    await waitFor(() => container.querySelector('.MuiCircularProgress-root'));
    await screen.findByText('Product 1');
    //const Product1 = await waitFor(() => getByText('Product 1'));
    /*await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });*/
    //const noData = await screen.findByText('No rows');
  });
});
