import { config } from "dotenv";

config();

export interface IMongoDBConfig {
  host: string;
  port: string;
  name: string;
}

const dev_config: IMongoDBConfig = {
  host: process.env.DEV_MONGODB_HOST || "localhost",
  port: process.env.DEV_MONGODB_PORT || "27017",
  name: process.env.DEV_MONGODB_NAME || "test",
};

const pro_config: IMongoDBConfig = {
  host: process.env.PRO_MONGODB_HOST as string,
  port: process.env.PRO_MONGODB_PORT as string,
  name: process.env.PRO_MONGODB_NAME as string,
};

const env = process.env.NODE_ENV || "development";

const db_config: IMongoDBConfig =
  env === "production" ? pro_config : dev_config;

export default db_config;
