import { config } from "dotenv";
import db_config, { IMongoDBConfig } from "./mongodb.config";

config();
interface IAppConfig {
    app: {
        baseUrl: string;
        port: number;
        apiKey?: {
            userService: string;
        };
    };
    mongodb: IMongoDBConfig;
}

const env = process.env.NODE_ENV;

const dev_config: IAppConfig = {
    app: {
        baseUrl: process.env.DEV_BASE_URL || "/authentication/api/v1",
        port: Number(process.env.DEV_PORT) || 5001,
        apiKey: {
            userService: process.env.DEV_API_KEY_AUTHENTICATION || "authentication",
        },
    },
    mongodb: db_config,
};

const pro_config: IAppConfig = {
    app: {
        baseUrl: process.env.PRO_BASE_URL as string,
        port: Number(process.env.PRO_PORT),
    },
    mongodb: db_config,
};

const app_config: IAppConfig = env === "production" ? pro_config : dev_config;
export default app_config;
