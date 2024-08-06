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

describe('ProductUpdate', () => {
  it('updates a product', async () => {
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
              canUpdateProduct: true,
            },
          },
        },
      }
    );

    const row = await screen.findByRole('row', { value: { rowindex: 2 } });
    console.log('menu', row.children);
    const { findByRole } = within(row);
    //const menu = await findByRole('menu');
  });
});
