"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../../lib/passport"));
const CLIENT_URL = "http://localhost:3000/auth/login";
const router = (0, express_1.Router)();
router.get("/login/success", (req, res) => {
    res.status(200).json({
        success: true,
        message: "successful",
        data: req.user,
        //cookies: req.cookies,
    });
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});
router.get("/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google"), (req, res) => {
    console.log(req.user);
    res.redirect(CLIENT_URL);
});
exports.default = router;
