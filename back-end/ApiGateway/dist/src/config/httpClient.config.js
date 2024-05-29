"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const createHttpClient = (baseURL, x_api_key) => {
    return axios_1.default.create({
        baseURL: baseURL,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": x_api_key,
        },
    });
};
exports.default = createHttpClient;
