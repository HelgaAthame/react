import { ErrorPage } from './errorPage/error-page.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './app/App';
import './index.scss';
import { AboutUs } from './aboutUs/aboutus/AboutUs';
import { FormPage } from './form/FormPage/';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
