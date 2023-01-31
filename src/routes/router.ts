import { Request, Response } from '../controllers';

export type Handler = (req: Request) => Promise<Response>;

export interface Router {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  middleware?: Handler;
  handler: Handler;
}
