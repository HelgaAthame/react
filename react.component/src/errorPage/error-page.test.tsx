import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from '../errorPage';

const fakeroutes = [
  {
    path: '/',
    element: <ErrorPage />,
  },
];
const router = createMemoryRouter(fakeroutes);

describe('react error page', () => {
  test('error page renders correctly', () => {
    render(<RouterProvider router={router} />);
    history.replaceState({}, '', 'fakeURL');
    window.location.assign(window.location.origin + '/fakePath');
    const errorDiv = screen.getByPlaceholderText('error-text');
    expect(errorDiv.innerHTML).toBe("Sorry, this page doesn't exist.");
  });
});
