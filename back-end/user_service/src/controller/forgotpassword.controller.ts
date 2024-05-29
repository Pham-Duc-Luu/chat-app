import { Request, Response } from "express";

import userService from "../services/user.service";

import utilService from "../services/util.service";
import validateService from "../services/validate.service";
import Logger from "../lib/logger";
import { table } from "console";
import { BadRequestResponse } from "../util/response/clientError.response";
import { ClientErrorResponse } from "../util/response/http.response";
class ForgotPassword {
  async sendCode(req: Request<any, any, { email: string }>, res: Response) {
    try {
      const { email } = req.body;

      // * Check the email is exist
      if (!email) {
        throw new BadRequestResponse();
      }

      // * use email to add reset code for user
      let user = await userService.getUserByEmail(email);

      if (!user) {
        throw new BadRequestResponse("User not found");
      }

      await userService.updateResetCode(email, utilService.randomDigital(6));

      return res.status(200).json({
        message: "Email sent",
      });
    } catch (error: any) {
      const err = new ClientErrorResponse(error.message, error.statuCode);
      return res.json(err.message);
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
        throw new BadRequestResponse();
      }
      // * check email is right format
      if (!validateService.validateEmail(email)) {
        throw new BadRequestResponse("Invalid email");
      }

      // * check password is right format
      if (!validateService.validatePassword(newPassword)) {
        throw new BadRequestResponse("Invalid password");
      }

      // * use email to add reset code for user
      let user = await userService.getUserByEmail(email);

      if (!user) {
        throw new BadRequestResponse("User not found");
      }

      if (user.resetCode !== resetCode) {
        throw new BadRequestResponse("Invalid reset code");
      }

      if (
        user?.resetCodeCreatedAt &&
        validateService.validateExpired(user.resetCodeCreatedAt)
      ) {
        // * check reset code is expired
        throw new BadRequestResponse("Expired reset code");
      }

      if (user.password === newPassword) {
        // * check password is diffrent
        throw new BadRequestResponse("Password is same");
      }

      let resetPassword = await userService.updatePassword(email, newPassword, [
        "email",
      ]);

      return res.status(200).json({
        data: resetPassword,
      });
    } catch (error: any) {
      console.log(error.stack);
      Logger.error(error);
      const err = new BadRequestResponse(error.message);
      return res.json({ message: err.message });
    }
  }
}

const forgotPasswordController = new ForgotPassword();
export default forgotPasswordController;
