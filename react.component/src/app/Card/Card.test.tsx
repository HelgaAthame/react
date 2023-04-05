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
    const card = screen.getAllByTestId('card');
    expect(card).toBeTruthy();
  });

  test('Card inner parts renders properly', async () => {
    render(<Card {...fakeCard} />);
    const ourDiv = screen.getByText(/fakeName/i);
    await waitFor(() => expect(ourDiv).toBeTruthy());
  });

  test('Modal window opens', async () => {
    render(<Card {...fakeCard} />);
    const card = screen.getByTestId('card');
    act(() => card.click());

    await waitFor(() => {
      const modal = screen.getByTestId('modal');
      expect(modal).toBeTruthy();
    });

    const close = screen.getByTestId('close');
    act(() => close.click());

    const name = screen.getByTestId('name');
    act(() => name.click());

    await waitFor(() => {
      const modal = screen.getByTestId('modal');
      expect(modal).toBeTruthy();
    });

    const modal = screen.getByTestId('modal');
    act(() => modal.click());

    const add = screen.getByTestId('additional-wrapper');
    act(() => add.click());

    await waitFor(() => {
      const modal = screen.getByTestId('modal');
      expect(modal).toBeTruthy();
    });
  });
});
