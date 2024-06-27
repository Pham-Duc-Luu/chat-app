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
  "DATABASE_URL",
] as const;

export type Tenv = (typeof ENVVARIABLE)[number];

const AppConfigEnv = util.getEnvVariables(Array.from(ENVVARIABLE));

console.log(AppConfigEnv);

export default AppConfigEnv;
