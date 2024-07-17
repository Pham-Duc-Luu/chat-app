import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import appRouter from './src/router/index';
import { connectDB } from './src/database/mongo/connect.mongo';
import morganMiddleware from './src/middleware/morgan.middleware';
import AppRouter from './src/router/index';
import AppConfigEnv from './src/config/app.config';
import deviceDetectorMiddleware from './src/middleware/deviceDetecto.middleware';
import ngrok from '@ngrok/ngrok';
import QRCode from 'qrcode';
import verifyApiKey from './src/middleware/apiKey.middleware';
import session from 'express-session';
import swaggerDocs from './swagger/swagger';
import cors from 'cors';
import delayMiddleware from './src/middleware/delay.middleware';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import OAuthGoogle from './src/router/auth/auth.googe.route';
import passport from 'passport';
import AppConfig from './src/config/app.config';

dotenv.config();
const app: Application = express();

app.set('trust proxy', true);

// * middleware
app.use(delayMiddleware({ delay: 1000 }));
app.use(
  session({
    secret: AppConfig.COOKIE_KEYS,
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(verifyApiKey);
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(json());
app.use(morganMiddleware);

// *
app.use(cors());
// app.options('*', cors())
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(deviceDetectorMiddleware);

async function main() {
  const server = app.listen(AppConfigEnv.APP_PORT, () => {
    console.log(
      `user server is running at http://localhost:${AppConfigEnv.APP_PORT}`
    );
  });

  app.get('/', (req, res) => {
    res.send('Welcome to our app!');
  });

  app.use(AppConfigEnv.APP_BASE_URL, appRouter);

  // * this is for testing purposes
  if (AppConfigEnv.ENV == 'development') {
    swaggerDocs(app, Number(AppConfigEnv.APP_PORT));
    console.log(
      `api documentation is available at http://localhost:${AppConfigEnv.APP_PORT}/docs`
    );
  }

  process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
  // ... you will write your Prisma Client queries here
}

main().then(async () => {
  /**
   * set up ngrok is only for testing and development purposes
   */
  if (AppConfigEnv.ENV === 'development') {
    try {
      const listener = await ngrok.forward({
        addr: AppConfigEnv.APP_PORT,
        authtoken: AppConfigEnv.NGROK_AUTHTOKEN,
      });
      const url = listener.url() as string;
      console.log(`Ingress established at: ${url}`);
      QRCode.toFile('public/ngrok.png', url);
    } catch (err) {
      console.error('Error establishing Ngrok tunnel:', err);
    }
  }
});
