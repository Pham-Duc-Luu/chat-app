"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../util/response/error");
const token_1 = __importDefault(require("../service/token"));
const User_model_1 = __importDefault(require("../models/User.model"));
class UserController {
    constructor() {
        /**
         * Creates a new pair of tokens (access and refresh).
         * This function handles the request to create a new token pair for a user.
         * It expects the request body to contain an email and an id.
         * If either the email or id is missing, it throws a MissingParameter error.
         * Otherwise, it generates new tokens, updates the user's refresh token in the database,
         * and returns the access token in the response.
         */
        this.createToken = async (req, res) => {
            try {
                const { email, id } = req.body;
                if (!email || !id) {
                    throw new error_1.MissingParameter("Missing email or id");
                }
                const { accessToken, refreshToken } = await token_1.default.createToken(email, id);
                await User_model_1.default.findOneAndUpdate({ _id: id }, { email, refreshToken }, { new: true, upsert: true });
                res.json({ accessToken });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        };
    }
}
const userController = new UserController();
exports.default = userController;
