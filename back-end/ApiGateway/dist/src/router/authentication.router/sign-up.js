"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_in_controller_1 = require("../../controller/sign_in.controller");
const router = (0, express_1.Router)();
router.post("/login", sign_in_controller_1.loginUser);
exports.default = router;
