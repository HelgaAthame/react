import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import React from 'react';
import { ErrorPage } from '../../errorPage';
import { AboutUs } from '../../aboutUs/aboutus/';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
];
const router = createMemoryRouter(routes);

describe('react app', () => {
  test('update data method works', () => {
    render(<RouterProvider router={router} />);
    const input = screen.getByTestId('input search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'fakeValue' } });
    expect(input.value).toBe('fakeValue');
  });
});
