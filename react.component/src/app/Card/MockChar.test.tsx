import { BookType } from '../types';
import * as fetchModule from './getChar';
import { describe, expect, test, vi } from 'vitest';
import { render, waitFor, screen, act } from '@testing-library/react';
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

export const amptyCard = {
  name: '',
  birth: '',
  race: '',
  death: '',
  hair: '',
  gender: '',
  height: '',
  realm: '',
  key: '',
  spouse: '',
  wikiUrl: '',
  _id: '',
};

describe('mock fetch', () => {
  test('fetch is working', async () => {
    const mock = vi
      .spyOn(fetchModule, 'getChar')
      .mockImplementation(async (): Promise<BookType> => {
        return fakeCard;
      });

    render(<Card {...fakeCard} />);
    waitFor(() => {
      const card = screen.getAllByTestId('card');
      act(() => card[0].click());
    });

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
  });

  test('throw an error', () => {
    const mock = vi
      .spyOn(fetchModule, 'getChar')
      .mockImplementation(async (): Promise<BookType> => {
        throw new Error('This is a fake error');
      });

    render(<Card {...fakeCard} />);
    waitFor(() => {
      const card = screen.getAllByTestId('card');
      act(() => card[0].click());
    });

    waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
  });

  test('Modal window opens', async () => {
    render(<Card {...amptyCard} />);
    await waitFor(() => {
      const cards = screen.getByTestId('card');
      act(() => cards.click());
    });

    await waitFor(() => {
      const modal = screen.getByTestId('modal');
      expect(modal).toBeTruthy();
    });

    const close = screen.getByTestId('close');
    act(() => close.click());

    const names = screen.getByTestId('name');
    act(() => names.click());

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
