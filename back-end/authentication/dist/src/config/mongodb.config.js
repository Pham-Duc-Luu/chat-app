"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dev_config = {
    host: process.env.DEV_MONGODB_HOST || "localhost",
    port: process.env.DEV_MONGODB_PORT || "27017",
    name: process.env.DEV_MONGODB_NAME || "test",
};
const pro_config = {
    host: process.env.PRO_MONGODB_HOST,
    port: process.env.PRO_MONGODB_PORT,
    name: process.env.PRO_MONGODB_NAME,
};
const env = process.env.NODE_ENV || "development";
const db_config = env === "production" ? pro_config : dev_config;
exports.default = db_config;
