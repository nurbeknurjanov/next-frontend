import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import {
  screen,
  within,
  waitFor /* fireEvent , act */,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';
import { Content } from 'components/layout/Content';

describe('Product', () => {
  it('creates a product', async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <Content>
        <Products />
      </Content>
    );

    const createButton = screen.getByRole('button', { name: 'Create product' });
    await user.click(createButton);

    await screen.findByRole('heading', {
      level: 2,
      name: /Create product/i,
    });

    expect(container).toMatchSnapshot();
    const modal = await screen.findByRole('dialog');
    const { getByLabelText } = within(modal);
    const nameInput = getByLabelText('Name');
    //console.log('name', modal.querySelector('input[name="name"]'));
    await user.type(nameInput, 'New product');
    const createProductButton = screen.getByRole('button', { name: 'Create' });
    await user.click(createProductButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    await waitFor(() => expect(nameInput).not.toBeInTheDocument());

    await screen.findByText('Successfully created');
    await screen.findByText('New product');
  });
});
