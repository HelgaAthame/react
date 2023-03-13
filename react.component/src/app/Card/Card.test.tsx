import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { cards } from '../cards';

const fakeUpdateData = () => {
  console.log('');
};

describe('react Card', () => {
  test('Card renders properly', () => {
    render(<Card key="0" {...cards[0]} cards={cards} updateData={fakeUpdateData} />);
    const likes = screen.getAllByPlaceholderText('likes');
    expect(likes).toBeTruthy();
    expect(likes[0].innerHTML.slice(-1)).toBe('3');
    likes[0].click();
    expect(likes[0].innerHTML.slice(-1)).toBe('3');
  });

  test('Card inner parts renders properly', () => {
    render(<Card key="0" {...cards[0]} cards={cards} updateData={fakeUpdateData} />);
    const ourDiv = screen.getByText(/angel/i);
    expect(ourDiv.innerHTML).toBe('The Angel of the West Window');
  });
});
