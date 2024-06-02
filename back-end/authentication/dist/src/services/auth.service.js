"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const User_model_1 = __importDefault(require("../models/User.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class AuthService {
    generateRandomString(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }
    async authGoogle(email) {
        const user = await User_model_1.default.findOne({ email: email });
        if (user) {
            return user;
        }
        const password = this.generateRandomString(10);
        const salt = (0, bcrypt_1.genSaltSync)(10);
        const hash = (0, bcrypt_1.hashSync)(password, salt);
        const newUser = await User_model_1.default.create({
            email,
            password: hash,
        });
        return newUser;
    }
}
const authService = new AuthService();
exports.default = authService;
