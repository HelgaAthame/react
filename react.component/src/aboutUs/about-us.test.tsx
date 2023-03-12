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
import { AboutUs } from ".";

const props = {};
const app = new App(props);

const fakeroutes = [
  {
    path: '/',
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  }
];
const router = createMemoryRouter(fakeroutes);

describe('react about-us page', () => {

  test('about-us page renders correctly', () => {
    render(<RouterProvider router={router} />);
    const errorDiv = screen.getByText(/olga/i);
    expect(errorDiv.innerHTML).toBe('My name is Olga Khmaruk');
  });
})
