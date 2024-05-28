import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import appRouter from "./src/router/index";
import app_config from "./src/config/server.config";
import { connectDB } from "./src/database/mongo/connect.mongo";

dotenv.config();

const app: Application = express();
const port = app_config.app.port || 8000;

// * middleware
app.use(helmet());
app.use(compression());
app.use(json());   
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(app_config.app.baseUrl, appRouter);

// * Connect to DB
connectDB()
  .then((_) => console.log(_))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
