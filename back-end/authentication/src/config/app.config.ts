import { config } from "dotenv";
import db_config, { IMongoDBConfig } from "./mongodb.config";
import _ from "lodash";
import util from "../util/function";
config();

/**
 *  TODO : add environment variables here
 */

const ENVVARIABLE = [
  "APP_BASE_URL",
  "ENV",
  "APP_PORT",
  "API_KEY_USER_SERVICE",
  "REDIS_URL",
  "SERVER_KEY",
  "MONGO_URL",
  "",
];
const AppConfigEnv = util.getEnvVariables(ENVVARIABLE);

console.log(AppConfigEnv);

const keys = util.keys(AppConfigEnv);

keys.forEach((key) => {});

let app_config: any;

export default app_config;
