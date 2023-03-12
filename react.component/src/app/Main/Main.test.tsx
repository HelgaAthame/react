import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { Main } from './Main';
import { cards } from '../cards';

describe('react Main', () => {
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
