import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexHtmlPath = resolve(__dirname, '../../index.html');
const entryServerPath = resolve(__dirname, 'entry-server.tsx');

export const createServer = async () => {
  const app = express();

  const {
    transformIndexHtml,
    ssrLoadModule,
    middlewares,
    ssrFixStacktrace,
  } = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const indexHTML = await readFile(indexHtmlPath, 'utf-8');
      const transformed = await transformIndexHtml(url, indexHTML);

      const splited = transformed.split('<!--placeholder-->');

      const { render } = await ssrLoadModule(entryServerPath);
      const { pipe } = await render(url, {
        onShellReady() {
          res.write(splited[0]);
          pipe(res);
        },
        onShellError(e: unknown) {
          if (e instanceof Error) console.error(e);
        },
        onAllReady() {
          res.write(splited[1]);
          res.end();
        },
        onError(err: Error) {
          console.error(err);
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        ssrFixStacktrace(e);
        next(e);
      }
    }
  });

  process.on('SIGINT', () => process.exit());
  process.on('uncaughtException', (e) => {
    console.log("An uncaught exception has occured");
    console.error(e);
    process.exit(1);
  });
  process.on('exit', () => console.log( 'Server closed' ));

  app.listen(5000);
}

createServer().then(() => console.log('Server listen on http://localhost:5000/'));
