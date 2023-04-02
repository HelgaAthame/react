import { describe, expect, test } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';

import { Card } from './Card';

export const fakeCard = {
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
  _id: 'fakeID',
};

describe('react Card', () => {
  test('Card renders properly', () => {
    render(<Card {...fakeCard} />);
    const card = screen.getAllByPlaceholderText('card');
    expect(card).toBeTruthy();
  });

  test('Card inner parts renders properly', async () => {
    render(<Card {...fakeCard} />);
    const ourDiv = screen.getByText(/fakeName/i);
    await waitFor(() => expect(ourDiv).toBeTruthy());
  });

  test('Modal window opens', async () => {
    render(<Card {...fakeCard} />);
    const card = screen.getByPlaceholderText('card');
    act(() => card.click());

    await waitFor(() => {
      const modal = card.querySelector('.modal');
      expect(modal).toBeTruthy();
    });

    const close = card.querySelector('.close') as HTMLElement;
    act(() => close.click());

    await waitFor(() => {
      const modal = card.querySelector('.modal');
      expect(modal).toBeFalsy();
    });

    const name = card.querySelector('.name') as HTMLElement;
    act(() => name.click());

    await waitFor(() => {
      const modal = card.querySelector('.modal');
      expect(modal).toBeTruthy();
    });

    const modal = card.querySelector('.modal') as HTMLElement;
    act(() => modal.click());

    await waitFor(() => {
      const modal = card.querySelector('.modal');
      expect(modal).toBeFalsy();
    });

    const add = card.querySelector('.additional-wrapper') as HTMLElement;
    act(() => add.click());

    await waitFor(() => {
      const modal = card.querySelector('.modal');
      expect(modal).toBeTruthy();
    });
  });
});
