import { describe, expect, test, beforeAll, afterAll, afterEach } from 'vitest';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
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
  rest.get(`https://the-one-api.dev/v2/character?name=/^.*.*$/i`, (req, res, ctx) =>
  res(
      ctx.status(200),
      ctx.json({
        docs: [fakeCard1, fakeCard2, fakeCard3, mrUnknown]
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
  test('rendering works', async () => {
    const main = render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    );

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input).toBeTruthy();

    await act(() => fireEvent.change(input, { target: { value: 'fakeName' } }));
    await act(() => fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13}));

    expect(input.value).toBe('fakeName');

    waitFor(() => {
      const cards = main.getAllByText('fakeName');
      expect(cards).toHaveLength(3);
      cards.forEach((card) => expect(card).toBeTruthy());
      act(() => cards[0].click());
    });

    act(() => fireEvent.change(input, { target: { value: 'fakeName1' } }));
    act(() => fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 }));

    waitFor(() => {
      const cards = screen.getAllByText(/fakeName/i);
      expect(cards).toHaveLength(3);
      cards.forEach((card) => expect(card).toBeTruthy());
    });

    /*const card = screen.getByTestId('card');
    expect(card).toBeTruthy();

    act(() => card.click());

    const formLink = screen.getByTestId('about-us-link');
    expect(formLink).toBeTruthy();

    act(() => formLink.click());


    waitFor(() => {
      const form = screen.getByTestId('form') as HTMLFormElement;
      expect(form).toBeTruthy();
    });*/
    /*const input = screen.getByRole('searchbox') as HTMLInputElement;
    act(() => fireEvent.change(input, { target: { value: 'fakeValue' } }));
    expect(input.value).toBe('fakeValue');*/
  });
});
