import express, { Express, Request, Response, Application } from "express";
import compression from "compression";
import { json } from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { config } from "dotenv";
import appRouter from "./src/router/index.router";
import Logger from "./src/lib/logger";
import { prisma } from "./src/database/postgresql/connect.postgresql";
import app_config from "./src/config/app.config";
import morganMiddleware from "./src/middleware/morgan.middleware";

config();

// * innitialization
const app: Application = express();

// * middleware
app.use(morganMiddleware);
app.use(compression());
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// * Connect to database

// * api version
app.use(app_config.app.baseUrl, appRouter);

app.get("/", (_, res) => {
  res.send("Welcome to user service");
});

async function main() {
  const server = app.listen(app_config.app.port, () => {
    console.log(`user server is running on port ${app_config.app.port}`);
  });
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
