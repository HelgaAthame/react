import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { SearchBar } from './SearchBar';
import { cards } from '../cards';

beforeEach( () => {
  //app.setState({cards: null});
})

const fakeUpdateData = () => {
  console.log('this is fake update data');
}

describe('react app', () => {
  test('SearchBar renders properly', () => {
    const searchbar = render(<SearchBar cards={cards} updateData={fakeUpdateData.bind(this)}/>);
    expect(searchbar).toBeTruthy();
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.type).toBe('search');
    expect(input.className).toBe('input');
  });
})
