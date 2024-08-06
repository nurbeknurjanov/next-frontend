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

describe('ProductCreate', () => {
  it('creates a product', async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <Content>
        <Products />
      </Content>,
      {
        preloadedState: {
          common: {
            hydrate: {
              isHydratedToClient: true,
            },
          },
          products: {
            productsPermissions: {
              canCreateProduct: true,
            },
          },
        },
      }
    );

    const createButton = screen.getByRole('button', { name: 'Create product' });
    await user.click(createButton);

    const heading = await screen.findByRole('heading', {
      level: 2,
      name: /Create product/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Create product');

    expect(container).toMatchSnapshot();
    const modal = await screen.findByRole('dialog');
    const { getByLabelText, getByRole } = within(modal);
    const nameInput = getByRole('textbox', { name: 'Name' });
    //const nameInput = getByLabelText('Name');
    //console.log('name', modal.querySelector('input[name="name"]'));
    await user.type(nameInput, 'New product');

    const descriptionInput = getByLabelText('Description', {
      selector: 'textarea',
    });
    await user.type(descriptionInput, 'Some description');

    const createProductButton = screen.getByRole('button', { name: 'Create' });
    await user.click(createProductButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    await waitFor(() => expect(nameInput).not.toBeInTheDocument());

    await screen.findByText('Successfully created');
    await screen.findByText('New product');
  });
});
