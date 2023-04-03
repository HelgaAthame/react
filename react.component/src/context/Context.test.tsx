import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, test, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { App } from '../app/App';
import { ErrorPage } from '../errorPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

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

const fakeCard1 = {
  key: 'fakeKey1',
  name: 'fakeName1',
  ...fakeInfo,
};
const fakeCard2 = {
  key: 'fakeKey2',
  name: 'fakeName2',
  ...fakeInfo,
};
const fakeCard3 = {
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
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input).toBeTruthy();

    await waitFor(() => {
      const cards = main.getAllByText(/fakeName/i);
      expect(cards).toHaveLength(3);
      cards.forEach((card) => expect(card).toBeTruthy());
    });

    act(() => fireEvent.change(input, { target: { value: 'fakeName1' } }));
    act(() => fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    await waitFor(() => {
      const cards = main.getAllByText(/fakeName/i);
      expect(cards).toHaveLength(1);
      cards.forEach((card) => expect(card).toBeTruthy());
    });
  });
});
