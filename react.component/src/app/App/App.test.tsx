import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { App } from './App';
import { cards } from '../cards';
import React from "react";
import { ErrorPage } from "../../errorPage";
import { AboutUs } from "../../aboutUs";

const props = {};
const app = new App(props);

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

describe('react app', () => {

  test('cards imports to app instance correctly', () => {
    expect(app.state.cards).toEqual(cards);
  });

  test('App renders properly', () => {
    render(<RouterProvider router={router} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeTruthy();
    const card = screen.findByText('The Castle');
    expect(card).toBeTruthy();
  });

  test('should update App State', () => {
    const fakeCards = [
      {
        name: 'Holly Bible',
        price: 999,
        country: 'Fake Country 1',
        genre: 'fake genre',
        year: 1000,
        author: 'Jesus Christ',
        likes: -5,
        picture: 'fake URL 1',
      },
      {
        name: 'Fake Name 2',
        price: 555,
        country: 'Fake Country 2',
        genre: 'fake genre',
        year: 0,
        author: 'Santa Claus',
        likes: Math.PI,
        picture: 'fake URL 2'
      }
    ];

    app.state = {cards: fakeCards};
    expect(app.state.cards[0].author).toBe('Jesus Christ');
    expect(app.state.cards[0].name).toBe('Holly Bible');
  });
})
