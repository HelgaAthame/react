/*
 * @vitest-environment
happy-dom
 */

import { mount } from "@vue/test-utils";
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

const props = {};
const app = new App(props);

beforeEach( () => {
  //app.setState({cards: cards});
})

describe('react app', () => {

  test('cards imports to app instance correctly', () => {
    //const props = {};
    //const app = new App(props);
    expect(app.state.cards).toEqual(cards);
  });

  test('order of books is proper', () => {
    //const props = {};
    //const app = new App(props);
    expect(app.state.cards[2]).toMatchInlineSnapshot(`
      {
        "author": "Franz Kafka",
        "country": "Czech",
        "genre": "novel",
        "likes": 3,
        "name": "The Castle",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Franz_Kafka_Das_Schloss.jpg/220px-Franz_Kafka_Das_Schloss.jpg",
        "price": 1200,
        "year": 1926,
      }
    `);
  });

  test('all the card field import properly', () => {
    //const props = {};
    //const app = new App(props);
    expect(app.state.cards[1]).toMatchSnapshot(`
    Object {
      "name": "The Modern JavaScript Tutorial",
      "country": "Russia",
      "author: "Ilya Kantor",
      "genre": "tutorial",
      "likes": 2,
      "picture": "https://i.livelib.ru/workpic/1001593289/200/a57d/Ilya_Kantor__Sovremennyj_uchebnik_JavaScript.jpg"
    }
    `);
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

  test('logo renders', () => {
    render(<Logo />);
    //WHY DOESN'T LOGO RENDERS???????//
  })
})
