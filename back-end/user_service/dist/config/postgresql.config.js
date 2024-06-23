"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dev_config = {
    username: process.env.DEV_POSTGRES_USERNAME || "user_service",
    password: process.env.DEV_POSTGRES_PASSWORD || "user_service",
    host: process.env.DEV_POSTGRES_HOST || "localhost",
    port: Number(process.env.DEV_POSTGRES_PORT) || 5432,
    database: process.env.DEV_POSTGRES_DATABASES || "user_db",
};
const pro_config = {
    username: process.env.PRO_POSTGRES_USERNAME || "user_service",
    password: process.env.PRO_POSTGRES_PASSWORD || "user_service",
    host: process.env.PRO_POSTGRES_HOST || "localhost",
    port: Number(process.env.DEV_POSTGRES_PORT) || 5432,
    database: process.env.PRO_POSTGRES_DATABASES || "user_db",
};
const env = process.env.NODE_ENV;
const postgresConfig = env === "production" ? pro_config : dev_config;
exports.default = postgresConfig;
