/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { HomeDummy } from 'components/pages/HomeDummy';

it('renders homepage unchanged', () => {
  const { container } = render(<HomeDummy />);
  expect(container).toMatchSnapshot();
});
