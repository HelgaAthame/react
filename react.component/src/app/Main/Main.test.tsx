import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { Main } from './Main';
import cards from '../cards';

beforeEach( () => {
  //app.setState({cards: null});
})

const fakeUpdateData = () => {
  console.log('this is fake update data');
}

describe('react app', () => {
  test('Main renders properly', () => {
    const fakeFunc = () => {
      console.log('it is a fake func');
    }
    const main = render(<Main cards={cards} updateData={fakeFunc.bind(this)}/>);
    expect(main).toBeTruthy();
    const card = main.getByText(/javascript/i);
    expect(card.innerHTML).toBe('The Modern JavaScript Tutorial');
  });
})
