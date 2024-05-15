import { config } from "dotenv";
import postgresConfig, { IPostgersqlConfig } from "./postgresql.config";

config();
interface IAppConfig {
  app: {
    baseUrl: string;
    port: number;
  };
  postgresql: IPostgersqlConfig;
}

const env = process.env.NODE_ENV;

const dev_config: IAppConfig = {
  app: {
    baseUrl: process.env.DEV_BASE_URL || "/user/api/v1",
    port: Number(process.env.DEV_PORT) || 1111,

  },
  postgresql: postgresConfig,
};

const pro_config: IAppConfig = {
  app: {
    baseUrl: process.env.PRO_BASE_URL as string,
    port: Number(process.env.PRO_PORT),
  },
  postgresql: postgresConfig,
};

const app_config: IAppConfig = env === "production" ? pro_config : dev_config;
export default app_config;
