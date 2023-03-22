import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from '../../errorPage';
import { AboutUs } from './AboutUs';

const fakeroutes = [
  {
    path: '/',
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
];
const router = createMemoryRouter(fakeroutes);

describe('react about-us page', () => {
  test('about-us page renders correctly', () => {
    render(<RouterProvider router={router} />);
    const aboutUs = screen.getByPlaceholderText('about us');
    expect(aboutUs).toBeTruthy;
  });
});
