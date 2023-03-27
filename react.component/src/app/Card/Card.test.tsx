import { describe, expect, test } from 'vitest';
import { render, screen, act } from '@testing-library/react';

import { Card } from './Card';

const fakeCard = {
  name: 'fakeName',
  birth: 'fakebirth',
  race: 'fakeRace',
  death: 'fakeDath',
  hair: 'fakeHair',
  gender: 'fakeGender',
  height: 'fakeHeight',
  realm: 'fakeRealm',
  key: 'fakeKey',
  spouse: 'fakeSpouse',
  wikiUrl: 'fakewikiurl',
  _id: 'fakeID'
}

describe('react Card', () => {
  test('Card renders properly', () => {
    render(<Card {...fakeCard}/>);
    const likes = screen.getAllByPlaceholderText('likes');
    expect(likes).toBeTruthy();
    expect(likes[0].innerHTML.slice(-1)).toBe('3');
    act(() => likes[0].click());
    expect(likes[0].innerHTML.slice(-1)).toBe('4');
  });

  test('Card inner parts renders properly', () => {
    render(<Card {...fakeCard}/>);
    const ourDiv = screen.getByText(/angel/i);
    expect(ourDiv.innerHTML).toBe('The Angel of the West Window');
  });
});
