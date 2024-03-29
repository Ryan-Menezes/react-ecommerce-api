import http from 'http';
import dotenv from 'dotenv';
import app from '@src/app';
import 'module-alias/register';

dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Running');
});
