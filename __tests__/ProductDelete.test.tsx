import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import {
  screen,
  within,
  //prettyDOM,
  waitFor /* fireEvent , act */,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';
import { Content } from 'components/layout/Content';

describe('ProductDelete', () => {
  it('deletes a product', async () => {
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
              canDeleteProduct: true,
            },
          },
        },
      }
    );

    expect(container).toMatchSnapshot();

    const Product1 = await screen.findByText('Product 1');
    const row = Product1.closest('.MuiDataGrid-row')! as HTMLDivElement;
    const { getByLabelText: getByLabelTextInRow } = within(row);

    const moreButton = getByLabelTextInRow('more');
    await user.click(moreButton);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    const { getByRole: getByRoleInTooltip } = within(tooltip);
    //console.log('tooltip', prettyDOM(tooltip));

    const deleteButton = getByRoleInTooltip('menuitem', {
      name: /Delete/i,
    });
    await user.click(deleteButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    await screen.findByRole('heading', {
      level: 2,
      name: /Delete product/i,
    });
    const {
      getByLabelText: getByLabelTextInModal,
      getByRole: getByRoleInModal,
    } = within(modal);
  });
});
