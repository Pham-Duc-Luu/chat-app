"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// db.ts
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = __importDefault(require("../../config/app.config"));
(0, dotenv_1.config)();
const MONGODB_URI = `mongodb://${app_config_1.default.mongodb.host}:${app_config_1.default.mongodb.port}`;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        return "Connected to Mongo";
    }
    catch (error) {
        return "Error while try to connect to Mongo";
    }
};
exports.connectDB = connectDB;
