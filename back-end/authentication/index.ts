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

config();
// * innitialization
const app: Application = express();

// * middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

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
