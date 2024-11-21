import express, { Express, Router } from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.SERVER_PORT;

export const initServer = (router: Router): Express => { 
  const app = express();

  app.use('/', router);

  return app;
}

export const startServer = (app: Express) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });
}