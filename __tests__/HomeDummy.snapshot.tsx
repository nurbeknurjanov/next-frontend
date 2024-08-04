/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithProviders } from 'tests';
import { HomeDummy } from 'components/pages/HomeDummy';

it('renders homepage unchanged', () => {
  const { container } = renderWithProviders(<HomeDummy />);
  expect(container).toMatchSnapshot();
});
