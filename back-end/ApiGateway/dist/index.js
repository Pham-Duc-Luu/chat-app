"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = require("body-parser");
const index_1 = __importDefault(require("./src/router/index"));
const server_config_1 = __importDefault(require("./src/config/server.config"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = server_config_1.default.app.port || 8000;
// * middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true })); // support encoded bodies
app.use(server_config_1.default.app.baseUrl, index_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
