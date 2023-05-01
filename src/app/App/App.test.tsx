import { describe, expect, test, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { ErrorPage } from '../../errorPage';
import { AboutUs } from '../../aboutUs/aboutus/';
import { FormPage } from '../../form/FormPage';

import { Provider } from 'react-redux';
import { store } from '../../redux-folder';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BookType } from '../types';

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
};

const fakeCard1: FakeType = {
  key: 'fakeKey1',
  name: 'fakeName1',
  _id: 'fakeID1',
  ...fakeInfo,
};
const fakeCard2: FakeType = {
  key: 'fakeKey2',
  name: 'fakeName2',
  _id: 'fakeID2',
  ...fakeInfo,
};
const fakeCard3: FakeType = {
  key: 'fakeKey3',
  name: 'fakeName3',
  _id: 'fakeID3',
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

const arr = [fakeCard1, fakeCard2, fakeCard3, mrUnknown];

const handlers = [
  rest.get(`https://the-one-api.dev/v2/character`, (req, res, ctx) => {
    const filteredArr = arr.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(req.url.search.slice(10, -5).toLowerCase()) !== -1
      )
    );

    if (req.url.search.slice(10, -5) === 'this-is-fake')
      return res(
        ctx.status(500),
        ctx.json({
          message: `Big error on the server side`,
        })
      );

    return res(
      ctx.status(200),
      ctx.json({
        docs: filteredArr,
      })
    );
  }),
  rest.get(`https://the-one-api.dev/v2/character/fakeID1`, (req, res, ctx) =>
    res(
      ctx.status(500),
      ctx.json({
        message: `Error on the server side`,
      })
    )
  ),
  rest.get(`https://the-one-api.dev/v2/character/fakeID2`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        fakeCard2,
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
beforeEach(() => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
  {
    path: '/form',
    element: <FormPage />,
  },
];
const router = createMemoryRouter(routes);

describe('react app', () => {
  test('input value changes', async () => {
    const input = (await screen.findByRole('searchbox')) as HTMLInputElement;
    expect(input).toBeTruthy();

    act(() => fireEvent.change(input, { target: { value: 'fakeName1' } }));
    act(() => fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    expect(input.value).toBe('fakeName1');

    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(4);
    cards.forEach((card) => expect(card).toBeTruthy());
  });

  test('cards works', async () => {
    const input = (await screen.findByRole('searchbox')) as HTMLInputElement;
    expect(input).toBeTruthy();

    act(() => fireEvent.change(input, { target: { value: 'fakeName' } }));
    act(() => fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(3);
    cards.forEach((card) => expect(card).toBeTruthy());

    act(() => cards[0].click());

    const modal = await screen.findByTestId('modal');
    expect(modal).toBeTruthy();

    const close = await screen.findByTestId('close');
    expect(close).toBeTruthy();

    act(() => close.click());

    act(() => cards[1].click());

    expect(modal).toBeTruthy();

    expect(close).toBeTruthy();

    act(() => close.click());
  });

  test('response in not ok', async () => {
    const input = (await screen.findByRole('searchbox')) as HTMLInputElement;
    expect(input).toBeTruthy();

    act(() => fireEvent.change(input, { target: { value: 'this-is-fake' } }));
    act(() => fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    const main = screen.getByTestId('main');
    expect(main.innerHTML).toContain('<section');
  });

  test('form page opens', async () => {
    const formLink = await screen.findByTestId('form-link');
    expect(formLink).toBeTruthy();

    act(() => formLink.click());

    const form = (await screen.findByTestId('form')) as HTMLFormElement;
    expect(form).toBeTruthy();
  });
});
