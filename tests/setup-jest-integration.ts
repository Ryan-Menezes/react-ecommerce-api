import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '@src/app';

dotenv.config({
  path: '.env.test',
});

beforeAll(async () => {
  global.request = supertest(app);
});
