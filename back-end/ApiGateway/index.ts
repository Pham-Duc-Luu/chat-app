import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import {json} from 'body-parser';
import appRouter from './src/router/index';
import {connectDB} from './src/database/mongo/connect.mongo';
import morganMiddleware from './src/middleware/morgan.middleware';
import AppRouter from './src/router/index';
import AppConfigEnv from './src/config/app.config';
import deviceDetectorMiddleware from './src/middleware/deviceDetecto.middleware';
import ngrok from '@ngrok/ngrok';
import QRCode from 'qrcode';
import verifyApiKey from './src/middleware/apiKey.middleware';
import session from 'express-session';
import swaggerDocs from
        './swagger/swagger';
import cors from 'cors';
import delayMiddleware from './src/middleware/delay.middleware';

dotenv.config();
import cookieParser from "cookie-parser"


const app: Application = express();

app.enable('trust proxy')

// * middleware
app.use(delayMiddleware({delay: 1000}));

// app.use(verifyApiKey);
app.use(helmet());
app.use(compression());
app.use(cookieParser())

app.use(json());
app.use(morganMiddleware);
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'SECRET',

        cookie: {
            sameSite: 'none',
            secure: true
        }
    })
);
app.use(cors(
    // {origin: "http://localhost:3000", optionsSuccessStatus: 200}
));
// app.options('*', cors())
app.use(express.urlencoded({extended: true})); // support encoded bodies
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
