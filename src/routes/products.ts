import { Router } from '@src/routes';
import { Request, productController } from '@src/controllers';

export const productsRoutes: Router[] = [
  {
    path: '/products',
    method: 'GET',
    handler: () => productController.index(),
  },
  {
    path: '/products/:id',
    method: 'GET',
    handler: (req: Request) => productController.show(req),
  },
];
