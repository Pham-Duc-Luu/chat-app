"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_postgresql_1 = require("../database/postgresql/connect.postgresql");
const logger_1 = __importDefault(require("../lib/logger"));
const clientError_response_1 = require("../util/response/clientError.response");
const sendMail_service_1 = __importDefault(require("./sendMail.service"));
const function_1 = __importDefault(require("../util/function"));
class UserService {
    async getUserByEmail(email, options = []) {
        try {
            const user = await connect_postgresql_1.prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                return null;
            }
            return function_1.default.pickerOptions(user, options);
        }
        catch (error) {
            logger_1.default.error(error);
            throw new clientError_response_1.BadRequest();
        }
    }
    async updateResetCode(email, resetCode, options = []) {
        try {
            const user = await connect_postgresql_1.prisma.user.update({
                where: {
                    email,
                },
                data: {
                    resetCode,
                    resetCodeCreatedAt: String(Date.now()),
                },
            });
            await sendMail_service_1.default.sendMailTo(email, resetCode);
            if (!user) {
                return undefined;
            }
            return function_1.default.pickerOptions(user, options);
        }
        catch (error) {
            console.log(error.stack);
            logger_1.default.error(error);
            throw new clientError_response_1.BadRequest();
        }
    }
    async updatePassword(email, password, options = []) {
        try {
            const user = await connect_postgresql_1.prisma.user.update({
                where: { email },
                data: {
                    password,
                },
            });
            return function_1.default.pickerOptions(user, options);
        }
        catch (error) {
            console.log(error.stack);
            logger_1.default.error(error);
            throw new clientError_response_1.BadRequest();
        }
    }
}
const userService = new UserService();
exports.default = userService;
