import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../src/app/App';
import cards from '../src/app/cards'
import Header from "../src/app/Header";
import Logo from "../src/app/Logo";
import Main from "../src/app/Main";
import React from "react";
import SearchBar from "../src/app/SearchBar";

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
    expect(getAllByTestId('card')).toHaveLength(2);
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

  test('Main renders properly', () => {
    const fakeFunc = () => {
      console.log('it is a fake func');
    }
    const main = render(<Main cards={cards} updateData={fakeFunc.bind(this)}/>);
    expect(main).toBeTruthy();
    const card = main.getByText(/javascript/i);
    expect(card.innerHTML).toBe('The Modern JavaScript Tutorial');
  });

  test('SearchBar renders properly', () => {
    const fakeFunc = () => {
      console.log('it is a fake func');
    }
    const searchbar = render(<SearchBar cards={cards} updateData={fakeFunc.bind(this)}/>);
    expect(searchbar).toBeTruthy();
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.type).toBe('search');
    expect(input.className).toBe('input');
  });

  test('Logo renders properly', () => {
    const logo = render(<Logo />);
  });

  test('Header renders properly', () => {

  });
})
