"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_up_1 = __importDefault(require("./sign-up"));
const authRouter = (0, express_1.Router)();
authRouter.post('/sign-up', sign_up_1.default);
exports.default = authRouter;
