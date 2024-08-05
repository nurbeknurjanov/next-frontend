import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen, waitFor, fireEvent /*, act */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';

describe('Home', () => {
  it('renders a heading', async () => {
    const user = userEvent.setup();

    const { container, getByText: _getByText } = renderWithProviders(
      <Products />
    );

    await waitFor(() => container.querySelector('.MuiCircularProgress-root'));
    await screen.findByText('Product 1');
    const inputFilterName = screen.getAllByLabelText('Name')[0];
    await user.type(inputFilterName, 'Product 5');
    const submitButton = screen.getByRole('button', { name: 'Search' });
    await user.click(submitButton);
    /*await waitFor(() =>
      expect(screen.getByText('Product 1')).not.toBeInTheDocument()
    );*/
    //await screen.findByText('Product 1');
    //expect(container).toMatchSnapshot();
    //fireEvent.change(inputFilterName, { target: { value: 'Product 5' } });
    //fireEvent.click(screen.getByText(/click me/i))
    //const Product1 = await waitFor(() => getByText('Product 1'));
    /*await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });*/
    //const noData = await screen.findByText('No rows');
  });
});
