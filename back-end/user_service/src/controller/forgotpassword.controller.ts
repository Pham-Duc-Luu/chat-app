import { Request, Response } from "express";
import {
    BadRequest,
    MissingParameter,
} from "../util/response/client_error.response";
import userService from "../services/user.service";

import { HttpErrorResponse } from "../util/response/http.response";
import utilService from "../services/util.service";
import validateService from "../services/validate.service";
import Logger from "../lib/logger";
import { table } from "console";
class ForgotPassword {
    async sendCode(req: Request<any, any, { email: string }>, res: Response) {
        try {
            const { email } = req.body;

            // * Check the email is exist
            if (!email) {
                throw new MissingParameter();
            }

            // * use email to add reset code for user
            let user = await userService.getUserByEmail(email);

            if (!user) {
                throw new BadRequest("User not found");
            }

            await userService.updateResetCode(
                email,
                utilService.randomDigital(6)
            );

            return res.status(200).json({
                message: "Email sent",
            });
        } catch (error: any) {
            const err = new HttpErrorResponse(error.message, error.statuCode);
            return res.status(err.statusCode).json(err.message);
        }
    }

    async resetPassword(
        req: Request<
            any,
            any,
            { email: string; resetCode: string; newPassword: string }
        >,
        res: Response
    ) {
        try {
            const { email, resetCode, newPassword } = req.body;

            // * Check the email,new password, reset code is exist
            if (!email || !resetCode || !newPassword) {
                throw new MissingParameter();
            }
            // * check email is right format
            if (!validateService.validateEmail(email)) {
                throw new BadRequest("Invalid email");
            }

            // * check password is right format
            if (!validateService.validatePassword(newPassword)) {
                throw new BadRequest("Invalid password");
            }

            // * use email to add reset code for user
            let user = await userService.getUserByEmail(email);

            if (!user) {
                throw new BadRequest("User not found");
            }

            if (user.resetCode !== resetCode) {
                throw new BadRequest("Invalid reset code");
            }

            if (
                user?.resetCodeCreatedAt &&
                validateService.validateExpired(user.resetCodeCreatedAt)
            ) {
                // * check reset code is expired
                throw new BadRequest("Expired reset code");
            }

            if (user.password === newPassword) {
                // * check password is diffrent
                throw new BadRequest("Password is same");
            }

            let resetPassword = await userService.updatePassword(
                email,
                newPassword,
                ["email"]
            );

            return res.status(200).json({
                data: resetPassword,
            });
        } catch (error: any) {
            console.log(error.stack);
            Logger.error(error);
            const err = new HttpErrorResponse(error.message, error.statuCode);
            return res.status(err.statusCode).json({ message: err.message });
        }
    }
}

const forgotPasswordController = new ForgotPassword();
export default forgotPasswordController;
