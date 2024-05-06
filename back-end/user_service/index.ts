import express, { Express, Request, Response, Application } from 'express';
import compression from 'compression';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import appRouter from './src/router/index.router';
import Logger from './src/lib/logger';
import { AppDataSource } from './src/data-source';

config();
// * innitialization
const app: Application = express();
const PORT = Number(process.env.PORT) || 5002;
const api_version = process.env.API_VERSION || '/user/api/v1';

// * middleware
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// * Connect to database
// * api version
app.use(api_version, appRouter);

app.get('/', (_, res) => {
  res.send('Welcome to user service');
});

AppDataSource.initialize().then(() => {
  console.log('postgres connection');
  const server = app.listen(PORT, () => {
    console.log(`user server is running on port ${PORT}`);
  });

  process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
});
