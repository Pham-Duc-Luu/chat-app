"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const postgresql_config_1 = __importDefault(require("./postgresql.config"));
(0, dotenv_1.config)();
const env = process.env.NODE_ENV;
const dev_config = {
    app: {
        baseUrl: process.env.DEV_BASE_URL || "/user/api/v1",
        port: Number(process.env.DEV_PORT) || 1111,
    },
    postgresql: postgresql_config_1.default,
};
const pro_config = {
    app: {
        baseUrl: process.env.PRO_BASE_URL,
        port: Number(process.env.PRO_PORT),
    },
    postgresql: postgresql_config_1.default,
};
const app_config = env === "production" ? pro_config : dev_config;
exports.default = app_config;
