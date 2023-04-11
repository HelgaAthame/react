import { App } from '../app/App';
import { BookType } from '../app/types';
import * as fetchModule from './getDocs';
import { describe, expect, test, vi } from 'vitest';
import { ErrorPage } from '../errorPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
];
const router = createMemoryRouter(routes);

describe('mock fetch', () => {
  test('fetch is working', async () => {
    const mock = vi
      .spyOn(fetchModule, 'getDocs')
      .mockImplementation(async (): Promise<BookType[]> => {
        throw new Error('error has happened');
      });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
  });
});
