import express, { Express, Request, Response, Application } from "express";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import appRouter from "./src/router/index.router";
import { connectDB } from "./src/database/mongodb/connect.mongo";
import Logger from "./src/lib/logger";
import app_config from "./src/config/app.config";
import morganMiddleware from "./src/middleware/morgan.middleware";
import session from "express-session";
import RedisStore from "connect-redis";
import IORedis from "ioredis";
config();
// * innitialization
const app: Application = express();

// * middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set("trust proxy", 1);

// Initialize client.
const redisClient = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);

// Initialize store.
const redisStore = new RedisStore({ client: redisClient });

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);
// * Connect to database
connectDB()
  .then((_) => console.log(_))
  .catch((err) => console.log(err));

// * api version
app.use(app_config.app.baseUrl, appRouter);

const server = app.listen(app_config.app.port, () => {
  console.log(
    `authentication server is running on port ${app_config.app.port}`
  );
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
