import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import { SearchBar } from './SearchBar';
import { cards } from '../cards';

const fakeUpdateData = () => {
  console.log('this is fake update data');
}

describe('react Search Bar', () => {
  test('SearchBar renders properly', () => {
    const searchbar = render(<SearchBar cards={cards} updateData={fakeUpdateData.bind(this)}/>);
    expect(searchbar).toBeTruthy();
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.type).toBe('search');
    expect(input.className).toBe('input');
    fireEvent.change(input, {target: {value: 'fakeValue'}});
    expect(input.value).toBe('fakeValue');
  });

  test('focus and blur input', () => {
    const searchbar = render(<SearchBar cards={cards} updateData={fakeUpdateData.bind(this)}/>);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.style.color).toBe('rgb(16, 153, 102)');
    fireEvent.blur(input);
    expect(input.style.color).toBe('rgb(16, 85, 68)');
  });
})
