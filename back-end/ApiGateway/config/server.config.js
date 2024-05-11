import { config } from "dotenv";
config();
const dev_config = {
    app: {
        baseUrl: process.env.DEV_BASE_URL || "/apigateway/api/v1",
        port: process.env.DEV_PORT || 1000,
    },
};

const pro_config = {
    app: {
        baseUrl: process.env.PRO_BASE_URL,
        port: process.env.PRO_PORT,
    },
};

const env = process.env.NODE_ENV;

const app_config = env === "production" ? pro_config : dev_config;

export default app_config;
