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
import swaggerDocs from "./src/util/swagger/swagger";
import prisma from "./src/lib/prisma";
import { redisStore } from "./src/database/redis/redis.connect";
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

app.use(
  session({
    store: redisStore,
    secret: process.env.AUTHENTICATION_SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

// * api version
app.use(app_config.app.baseUrl, appRouter);

app.get("/", (req, res) => {
  return res.send("Welcome to authetication service");
});

async function main() {
  const server = app.listen(app_config.app.port, () => {
    console.log(`user server is running on port ${app_config.app.port}`);
  });

  swaggerDocs(app, app_config.app.port);
  process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
  // ... you will write your Prisma Client queries here
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
