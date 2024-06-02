"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../util/response/error");
class AuthController {
    async sign_up(req, res) {
        try {
            const api_key = req.headers["x-api-key"];
            const { email, id } = req.body;
            const apiKey = process.env.API_KEY || 'api-key';
            if (!api_key) {
                throw new error_1.BadRequest("missing api key");
            }
            if (apiKey !== api_key) {
                throw new error_1.Unauthorized("Not Permittion");
            }
        }
        catch (error) {
        }
    }
}
const authController = new AuthController();
exports.default = authController;
