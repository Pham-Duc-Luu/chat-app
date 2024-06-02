"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const index_router_1 = __importDefault(require("./src/router/index.router"));
const connect_mongo_1 = require("./src/database/mongodb/connect.mongo");
const app_config_1 = __importDefault(require("./src/config/app.config"));
(0, dotenv_1.config)();
// * innitialization
const app = (0, express_1.default)();
// * middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true })); // support encoded bodies
// * Connect to database
(0, connect_mongo_1.connectDB)()
    .then((_) => console.log(_))
    .catch((err) => console.log(err));
// * api version
app.use(app_config_1.default.app.baseUrl, index_router_1.default);
const server = app.listen(app_config_1.default.app.port, () => {
    console.log(`authentication server is running on port ${app_config_1.default.app.port}`);
});
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});
