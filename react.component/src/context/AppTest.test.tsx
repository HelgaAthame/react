import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { App } from '../app/App';
import { ErrorPage } from '../errorPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { BookType } from '../app/types';

interface FakeType extends BookType {
  key: string;
}

const fakeInfo = {
  birth: 'fakebirth',
  race: 'fakeRace',
  death: 'fakeDath',
  hair: 'fakeHair',
  gender: 'fakeGender',
  height: 'fakeHeight',
  realm: 'fakeRealm',
  spouse: 'fakeSpouse',
  wikiUrl: 'fakewikiurl',
  _id: 'fakeID',
};

const fakeCard1: FakeType = {
  key: 'fakeKey1',
  name: 'fakeName1',
  ...fakeInfo,
};
const fakeCard2: FakeType = {
  key: 'fakeKey2',
  name: 'fakeName2',
  ...fakeInfo,
};
const fakeCard3: FakeType = {
  key: 'fakeKey3',
  name: 'fakeName3',
  ...fakeInfo,
};

const mrUnknown = {
  key: 'someKey',
  name: '',
  birth: '',
  race: '',
  death: '',
  hair: '',
  gender: '',
  height: '',
  realm: '',
  spouse: '',
  wikiUrl: '',
  _id: '',
};

const handlers = [
  rest.get(`https://the-one-api.dev/v2/character`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        docs: [fakeCard1, fakeCard2, fakeCard3, mrUnknown],
      })
    )
  ),
  rest.get(`https://the-one-api.dev/v2/character/fakeID`, (req, res, ctx) =>
    res(
      ctx.status(500),
      ctx.json({
        message: `Error on the server side`,
      })
    )
  ),
];

const server = setupServer(...handlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
];
const router = createMemoryRouter(routes);

describe('mock to API', () => {
  test('loading after Enter press', async () => {
    const main = render(<RouterProvider router={router} />);
    const input = screen.getByTestId('input search') as HTMLInputElement;
    expect(input).toBeTruthy();

    await waitFor(() => {
      const cards = main.getAllByText(/fakeName/i);
      expect(cards).toHaveLength(3);
      cards.forEach((card) => expect(card).toBeTruthy());
      act(() => cards[0].click());
    });

    act(() => fireEvent.change(input, { target: { value: 'fakeName1' } }));
    act(() => fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    await waitFor(() => {
      const cards = main.getAllByText(/fakeName/i);
      expect(cards).toHaveLength(3);
      cards.forEach((card) => expect(card).toBeTruthy());
    });
  });
});
