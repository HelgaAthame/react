import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { Logo } from './Logo';
import cards from '../cards';

beforeEach( () => {
  //app.setState({cards: null});
})

const fakeUpdateData = () => {
  console.log('this is fake update data');
}

describe('react app', () => {

  test('Logo renders properly', () => {
    const logo = render(<Logo />);
  });
})
