import React from 'react';
import {
  createStaticHandler,
  createStaticRouter,
  StaticHandlerContext,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from '../redux-folder';
import { routes } from './routes';

export const render = async (url: string, opts?: object) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = new Request(`http://localhost:5000${url}`, {
    method: 'GET',
  });
  const context = (await query(fetchRequest)) as StaticHandlerContext;
  const router = createStaticRouter(dataRoutes, context);

  return renderToPipeableStream(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    </React.StrictMode>,
    opts
  );
};
