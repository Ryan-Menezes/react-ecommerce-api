import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '@src/app';

dotenv.config({
  path: '.env.test',
});

const request = supertest(app);
