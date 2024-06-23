import { config } from "dotenv";
import db_config, { IMongoDBConfig } from "./mongo.config";

config();

interface IAppConfig {
  app: {
    version?: string;
    baseUrl: string;
    port: number;
  };
  mongodb: IMongoDBConfig;
  services: {
    UserService: {
      base_url: string;
      api_key: string;
    };
    Authentication: {
      base_url: string;
      api_key: string;
    };
  };
}

const dev_config: IAppConfig = {
  app: {
    baseUrl: process.env.DEV_BASE_URL || "/apigateway/api/v1",
    port: Number(process.env.DEV_PORT) || 1000,
  },
  services: {
    UserService: {
      base_url:
        process.env.DEV_USER_SERVICE_URL ||
        "http://localhost:5002/user/api/v1/",
      api_key: process.env.DEV_USER_SERVICE_API_KEY || "api-key",
    },
    Authentication: {
      base_url:
        process.env.DEV_AUTHENTICATION_URL ||
        "http://localhost:5003/authentication/api/v1",
      api_key: process.env.DEV_AUTHENTICATION_API_KEY || "authentication",
    },
  },
  mongodb: db_config,
};

const pro_config: IAppConfig = {
  app: {
    baseUrl: process.env.PRO_BASE_URL as string,
    port: Number(process.env.PRO_PORT),
  },
  services: {
    UserService: {
      base_url:
        process.env.PRO_USER_SERVICE_URL ||
        "http://localhost:5002/user/api/v1/",
      api_key: process.env.DEV_USER_SERVICE_API_KEY || "userService",
    },
    Authentication: {
      base_url:
        process.env.PRO_AUTHENTICATION_URL ||
        "http://localhost:5002/authentication/api/v1",
      api_key: process.env.DEV_AUTHENTICATION_API_KEY || "authentication",
    },
  },
  mongodb: db_config,
};

const env = process.env.NODE_ENV;

const app_config = env === "production" ? pro_config : dev_config;

export default app_config;
