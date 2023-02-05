import express, { Request, Response, NextFunction } from 'express';
import httpErrors from 'http-errors';
import cors from 'cors';
import { productsRoutes } from '@src/routes';
import { ExpressRouterAdapter } from '@src/adapters';

const app = express();

app.use(
  cors({
    allowedHeaders: ['content-type'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

productsRoutes.forEach((router) => {
  const method = router.method.toLocaleLowerCase();
  const handler = ExpressRouterAdapter.adapt(router);
  app.get(router.path, handler);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(httpErrors.NotFound());
});

app.use(
  (
    err: httpErrors.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { status = 500, message } = err;

    res.status(404).json({
      message: message,
      statusCode: status,
    });
  }
);

export default app;
