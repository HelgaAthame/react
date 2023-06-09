import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { Logo } from './Logo';
import { cards } from '../cards';
import { ErrorPage } from "../../errorPage";
import { AboutUs } from "../../aboutUs";
import { App } from '../App';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  }
];
const router = createMemoryRouter(routes);

describe('react Logo', () => {

  test('Logo renders properly', () => {
    render(<RouterProvider router={router} />);
    const logo = screen.findAllByTestId('logo');
    expect(logo).toBeTruthy();
  });
})
