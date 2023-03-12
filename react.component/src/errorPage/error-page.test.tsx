import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { App } from '../app/App';
import { cards } from '../app/cards';
import React from "react";
import { ErrorPage } from "../errorPage";
import { AboutUs } from "../aboutUs";

const props = {};
const app = new App(props);

const fakeroutes = [
  {
    path: '/',
    element: <ErrorPage />,
  }
];
const router = createMemoryRouter(fakeroutes);

describe('react error page', () => {

  test('error page renders correctly', () => {
    render(<RouterProvider router={router} />);
    history.replaceState({}, '', 'fakeURL');
    window.location.assign(window.location.origin + '/fakePath');
    const errorDiv = screen.getByPlaceholderText('error-text');
    expect(errorDiv.innerHTML).toBe('Sorry, an unexpected error has occurred.');
  });
})
