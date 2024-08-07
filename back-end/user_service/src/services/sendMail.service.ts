import { config } from "dotenv";
import Logger from "../lib/logger";
import { BadRequestResponse } from "../util/response/clientError.response";

const nodemailer = require("nodemailer");

config();
class SendMailService {
  async sendMailTo(email: string, message: string) {
    try {
      const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.gmail.com",

        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.HOST_EMAIL_ADDRESS,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: `process.env.HOST_EMAIL_ADDRESS`, // sender address
        to: email, // list of receivers
        subject: "Reset code ", // Subject line
        html: `<p>${message}</p>`, // html body
      });
    } catch (error) {
      Logger.error(error);
      throw new BadRequestResponse();
    }
  }
}

const sendMailService = new SendMailService();

export default sendMailService;
