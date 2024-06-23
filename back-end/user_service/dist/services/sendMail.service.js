"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const logger_1 = __importDefault(require("../lib/logger"));
const clientError_response_1 = require("../util/response/clientError.response");
const nodemailer = require("nodemailer");
(0, dotenv_1.config)();
class SendMailService {
    async sendMailTo(email, message) {
        try {
            const transporter = nodemailer.createTransport({
                port: 587,
                host: "smtp.gmail.com",
                secure: false,
                auth: {
                    user: process.env.HOST_EMAIL_ADDRESS,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: `process.env.HOST_EMAIL_ADDRESS`,
                to: email,
                subject: "Reset code ",
                html: `<p>${message}</p>`, // html body
            });
        }
        catch (error) {
            logger_1.default.error(error);
            throw new clientError_response_1.BadRequest();
        }
    }
}
const sendMailService = new SendMailService();
exports.default = sendMailService;
