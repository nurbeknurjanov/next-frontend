import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen, waitFor /* fireEvent , act */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';
import { Content } from 'components/layout/Content';

describe('Home', () => {
  it('renders a heading', async () => {
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

    const nameInput = container.querySelector(
      '.MuiDialogContent-root input[name="Name"]'
    );
    await user.type(nameInput!, 'New product');
    const createProductButton = screen.getByRole('button', { name: 'Create' });
    await user.click(createProductButton);

    await screen.findByText('Successfully created');
  });
});
