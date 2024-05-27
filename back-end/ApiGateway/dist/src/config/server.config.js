"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dev_config = {
    app: {
        baseUrl: process.env.DEV_BASE_URL || "/apigateway/api/v1",
        port: process.env.DEV_PORT || 1000,
    },
    services: {
        UserService: {
            base_url: process.env.DEV_USER_SERVICE_URL || "http://localhost:5002/user/api/v1/",
            api_key: process.env.DEV_USER_SERVICE_API_KEY || "userService",
        },
        Authentication: {
            base_url: process.env.DEV_AUTHENTICATION_URL || "http://localhost:5002/authentication/api/v1",
            api_key: process.env.DEV_AUTHENTICATION_API_KEY || "authentication"
        },
    },
};
const pro_config = {
    app: {
        baseUrl: process.env.PRO_BASE_URL,
        port: Number(process.env.PRO_PORT),
    },
    services: {
        UserService: {
            base_url: process.env.PRO_USER_SERVICE_URL ||
                "http://localhost:5002/user/api/v1/",
            api_key: process.env.DEV_USER_SERVICE_API_KEY || "userService",
        },
        Authentication: {
            base_url: process.env.PRO_AUTHENTICATION_URL ||
                "http://localhost:5002/authentication/api/v1",
            api_key: process.env.DEV_AUTHENTICATION_API_KEY || "authentication",
        },
    },
};
const env = process.env.NODE_ENV;
const app_config = env === "production" ? pro_config : dev_config;
exports.default = app_config;
