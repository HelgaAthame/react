import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { Card } from './Card';
import { cards } from '../cards';

beforeEach( () => {
  //app.setState({cards: null});
})

const fakeUpdateData = () => {
  console.log('this is fake update data');
}

describe('react app', () => {

  test('Card renders properly', () => {
    render(<Card key="0" {...cards[0]} cards={cards} updateData = {fakeUpdateData} />);
  });
})
