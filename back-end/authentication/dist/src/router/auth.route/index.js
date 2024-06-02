"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
// TODO: create a sign-up route
authRouter.post('/sign-up', function signUp() { });
exports.default = authRouter;
