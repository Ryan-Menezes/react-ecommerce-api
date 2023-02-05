import http from 'http';
import dotenv from 'dotenv';
import app from '@src/app';

dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server Running');
});
