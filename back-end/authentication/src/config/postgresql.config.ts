import { config } from "dotenv";

config();

export interface IPostgersqlConfig {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
    datebaseUrl : string;
}

const dev_config: IPostgersqlConfig = {
  username: process.env.DEV_POSTGRES_USERNAME || "user_service",
  password: process.env.DEV_POSTGRES_PASSWORD || "user_service",
  host: process.env.DEV_POSTGRES_HOST || "localhost",
  port: Number(process.env.DEV_POSTGRES_PORT) || 5432,
  database: process.env.DEV_POSTGRES_DATABASES || "user_db",
  datebaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Phamluu2003@localhost:5432/postgres?schema=public",
};

const pro_config: IPostgersqlConfig = {
  username: process.env.PRO_POSTGRES_USERNAME || "user_service",
  password: process.env.PRO_POSTGRES_PASSWORD || "user_service",
  host: process.env.PRO_POSTGRES_HOST || "localhost",
  port: Number(process.env.DEV_POSTGRES_PORT) || 5432,
  database: process.env.PRO_POSTGRES_DATABASES || "user_db",
  datebaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Phamluu2003@localhost:5432/postgres?schema=public",
};

const env = process.env.NODE_ENV;

const postgresConfig: IPostgersqlConfig =
    env === "production" ? pro_config : dev_config;

export default postgresConfig;
