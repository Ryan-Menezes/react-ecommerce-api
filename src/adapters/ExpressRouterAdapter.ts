import { Router } from '@src/routes';
import { Request, Response } from 'express';

export class ExpressRouterAdapter {
  public static adapt(router: Router) {
    return async (req: Request, res: Response) => {
      const request = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      const { response, statusCode } = await router.handler(request);
      res.status(statusCode).json(response);
    };
  }
}
