import "reflect-metadata"
import * as express from 'express';
import Database from "./orm";
import API from './api';

Database.initialize().then(() => {
  const app = express();
  
  app.use('/api', API);
  
  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
})
