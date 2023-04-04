import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { SearchBar } from './SearchBar';

describe('react Search Bar', () => {
  test('SearchBar renders properly', () => {
    const searchbar = render(<SearchBar />);
    expect(searchbar).toBeTruthy();
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.type).toBe('search');
    expect(input.className).toBe('input');
    fireEvent.change(input, { target: { value: 'fakeValue' } });
    expect(input.value).toBe('fakeValue');
  });
});
