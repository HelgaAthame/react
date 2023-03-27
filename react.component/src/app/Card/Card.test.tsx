import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';

import { Card } from './Card';
import { cards } from '../cards';

describe('react Card', () => {
  test('Card renders properly', () => {
    render(<Card key="0" {...cards[0]} cards={cards} />);
    const likes = screen.getAllByPlaceholderText('likes');
    expect(likes).toBeTruthy();
    expect(likes[0].innerHTML.slice(-1)).toBe('3');
    act(() => {
      likes[0].click();
    });
    expect(likes[0].innerHTML.slice(-1)).toBe('4');
  });

  test('Card inner parts renders properly', () => {
    render(<Card key="0" {...cards[0]} cards={cards} />);
    const ourDiv = screen.getByText(/angel/i);
    expect(ourDiv.innerHTML).toBe('The Angel of the West Window');
  });
});
