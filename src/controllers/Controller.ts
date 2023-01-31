export interface Request {
  body: {
    [key: string | number]: any;
  };
  params: {
    [key: string | number]: any;
  };
  query: {
    [key: string | number]: any;
  };
}

export interface Response {
  response: {
    [key: string | number]: any;
  };
  statusCode: number;
}
