import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { App } from './App';
import cards from '../cards'
import React from "react";

const props = {};
const app = new App(props);

beforeEach( () => {
  //app.setState({cards: null});
})

describe('react app', () => {

  test('cards imports to app instance correctly', () => {
    expect(app.state.cards).toEqual(cards);
  });

  test('order of books is proper', () => {
    const { getAllByTestId } = render(<App />);
    expect(getAllByTestId('card')).toHaveLength(16);
    expect(getAllByTestId('card')[2].className).toBe('card');
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
