import express, { Express, Request, Response, Application } from "express";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import appRouter from "./src/router/index.router";
import Logger from "./src/lib/logger";
import appConfig from "./src/config/app.config";
import { Client } from "pg";
import { error } from "console";

// Load environment variables
dotenvConfig();

// * Initialization
const app: Application = express();

// * Middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

// * Connect to database
const client = new Client({
  connectionString: appConfig.postgresql.datebaseUrl,
});

client
  .connect()
  .then(() => {
    Logger.info("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
    Logger.error("Database connection error", err.stack);
    process.exit(1);
  });

// * API version
app.use(appConfig.app.baseUrl, appRouter);

const server = app.listen(appConfig.app.port, () => {
  Logger.info(`Authentication server is running on port ${appConfig.app.port}`);
});

process.on("unhandledRejection", (error, promise) => {
  Logger.error(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
