import express, { Express, Request, Response, Application } from 'express';
import compression from 'compression';
import { json } from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import { config } from 'dotenv';
import appRouter from './src/router/index.router';
import app_config from './src/config/app.config';
import morganMiddleware from './src/middleware/morgan.middleware';
import swaggerDocs from './src/util/swagger/swagger';
import AppConfigEnv from './src/config/app.config';
import prisma from './src/database/postgresql/connect.postgresql';
import verifyApiKey from './src/middleware/apikey.middleware';
config();

// * innitialization
const app: Application = express();

// * middleware
app.use(morganMiddleware);
app.use(compression());
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

async function main() {
  const server = app.listen(AppConfigEnv.APP_PORT, () => {
    console.log(
      `user server is running on http://localhost${AppConfigEnv.APP_PORT}`
    );
  });

  app.use(AppConfigEnv.APP_BASE_URL, appRouter);

  /**
   * ! API DOCUMENTATION is can not be published
   */
  if (AppConfigEnv.ENV === 'development') {
    swaggerDocs(app, Number(AppConfigEnv.APP_PORT));
    console.log(
      `api documentation is available at http://localhost:${AppConfigEnv.APP_PORT}/docs`
    );

    app.get('/', (req, res) => {
      res.send('webcome to user server');
    });
  }

  process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
