"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const util_service_1 = __importDefault(require("../services/util.service"));
const validate_service_1 = __importDefault(require("../services/validate.service"));
const logger_1 = __importDefault(require("../lib/logger"));
const clientError_response_1 = require("../util/response/clientError.response");
const http_response_1 = require("../util/response/http.response");
class ForgotPassword {
    async sendCode(req, res) {
        try {
            const { email } = req.body;
            // * Check the email is exist
            if (!email) {
                throw new clientError_response_1.BadRequestResponse();
            }
            // * use email to add reset code for user
            let user = await user_service_1.default.getUserByEmail(email);
            if (!user) {
                throw new clientError_response_1.BadRequestResponse("User not found");
            }
            await user_service_1.default.updateResetCode(email, util_service_1.default.randomDigital(6));
            return res.status(200).json({
                message: "Email sent",
            });
        }
        catch (error) {
            const err = new http_response_1.ClientErrorResponse(error.message, error.statuCode);
            return res.json(err.message);
        }
    }
    async resetPassword(req, res) {
        try {
            const { email, resetCode, newPassword } = req.body;
            // * Check the email,new password, reset code is exist
            if (!email || !resetCode || !newPassword) {
                throw new clientError_response_1.BadRequestResponse();
            }
            // * check email is right format
            if (!validate_service_1.default.validateEmail(email)) {
                throw new clientError_response_1.BadRequestResponse("Invalid email");
            }
            // * check password is right format
            if (!validate_service_1.default.validatePassword(newPassword)) {
                throw new clientError_response_1.BadRequestResponse("Invalid password");
            }
            // * use email to add reset code for user
            let user = await user_service_1.default.getUserByEmail(email);
            if (!user) {
                throw new clientError_response_1.BadRequestResponse("User not found");
            }
            if (user.resetCode !== resetCode) {
                throw new clientError_response_1.BadRequestResponse("Invalid reset code");
            }
            if ((user === null || user === void 0 ? void 0 : user.resetCodeCreatedAt) &&
                validate_service_1.default.validateExpired(user.resetCodeCreatedAt)) {
                // * check reset code is expired
                throw new clientError_response_1.BadRequestResponse("Expired reset code");
            }
            if (user.password === newPassword) {
                // * check password is diffrent
                throw new clientError_response_1.BadRequestResponse("Password is same");
            }
            let resetPassword = await user_service_1.default.updatePassword(email, newPassword, [
                "email",
            ]);
            return res.status(200).json({
                data: resetPassword,
            });
        }
        catch (error) {
            console.log(error.stack);
            logger_1.default.error(error);
            const err = new clientError_response_1.BadRequestResponse(error.message);
            return res.json({ message: err.message });
        }
    }
}
const forgotPasswordController = new ForgotPassword();
exports.default = forgotPasswordController;
