import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Chore from './components/Chore'

// test('renders learn react link', () => {
//   const { getByText } = render(<Chore />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('starter test', () => {
  const value = 1;
  expect(value).toEqual(1);
});
