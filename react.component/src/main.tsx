import { ErrorPage } from './errorPage';
import React from 'react';
import ReactDOM, { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './app/App';
import './index.scss';
import { AboutUs } from './aboutUs/aboutus';
import { FormPage } from './form/FormPage';

import { Provider } from 'react-redux';
import { store } from './redux-folder';

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
  }
];

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
