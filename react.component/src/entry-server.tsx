import React from 'react';
import {
  createStaticHandler,
  createStaticRouter,
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server";
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from './redux-folder';
import { App } from './app/App';
import { AboutUs } from './aboutUs/aboutus';
import { FormPage } from './form/FormPage';
import { ErrorPage } from './errorPage';

export const render = async (url: string, opts?: object) => {
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

  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = new Request(`http://localhost:5000${url}`, {
    method: 'GET',
  });
  let context = await query(fetchRequest) as StaticHandlerContext;
  const router = createStaticRouter(dataRoutes, context);

  return renderToPipeableStream(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
        />
      </Provider>
    </React.StrictMode>,
    opts
  );
};
