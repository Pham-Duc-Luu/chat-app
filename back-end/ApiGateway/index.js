import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import app_config from "./config/server.config";
config();
const app = express();
// * middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use(app_config.app.baseUrl);
app.listen(app_config.app.port, (error) => {
    if (!error) console.log("Api gateway have running at port : " + PORT);
    else console.log("Error occurred, server can't start", error);
});
