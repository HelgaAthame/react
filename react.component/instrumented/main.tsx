import { ErrorPage } from './errorPage';
import React from 'react';
import ReactDOM, { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux-folder';
import { routes } from './server/routes';

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
