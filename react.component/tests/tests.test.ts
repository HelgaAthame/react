/*
 * @vitest-environment
happy-dom
 */

import { mount } from "@vue/test-utils";
import {
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../src/app/App';
import cards from '../src/app/cards'

describe('здесь должно быть название серии тестов', () => {

  test('cards imports to app instance correctly', () => {
    const props = {};
    const app = new App(props);
    expect(app.state.cards).toEqual(cards);
  });

  test('order of books is proper', () => {
    const props = {};
    const app = new App(props);
    expect(app.state.cards[2]).toMatchInlineSnapshot(`
    {
      "name": "The Castle",
      "country": "Czech",
      "author: "Franz Kafka",
      "genre": "novel",
      "likes": 3,
      "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Franz_Kafka_Das_Schloss.jpg/220px-Franz_Kafka_Das_Schloss.jpg"
    }
    `);
  });

  test('all the card field import properly', () => {
    const props = {};
    const app = new App(props);
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

  
})
