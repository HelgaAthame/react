import React from 'react';
import { AboutUs } from '../aboutUs/aboutus';
import { App } from '../app/App';
import { ErrorPage } from '../errorPage';
import { FormPage } from '../form/FormPage';

export const routes = [
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
