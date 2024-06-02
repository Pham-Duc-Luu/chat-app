"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const apiKey_middleware_1 = __importDefault(require("../middleware/apiKey.middleware"));
const appRouter = (0, express_1.Router)();
/**
 * Middleware to check api-key (permission to use other services)
 */
appRouter.use(apiKey_middleware_1.default);
/**
 * Generate a pair token
 */
appRouter.post("/generate-token", user_controller_1.default.createToken);
exports.default = appRouter;
