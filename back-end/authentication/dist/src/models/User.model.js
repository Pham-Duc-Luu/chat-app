"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Define the schema for user document
const UserSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.REFRESHTOKENEXPIRY,
    },
});
// Create and export the User model
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
