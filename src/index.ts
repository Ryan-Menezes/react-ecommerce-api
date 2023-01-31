import express from 'express';
import dotenv from 'dotenv';
import { productsRoutes } from '@src/routes';
import { ExpressRouterAdapter } from '@src/adapters';

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({
  extended: true,
}));

productsRoutes.forEach(router => {
  const method = router.method.toLocaleLowerCase();
  const handler = ExpressRouterAdapter.adapt(router);
  server.get(router.path, handler);
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Running');
});
