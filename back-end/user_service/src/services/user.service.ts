import { User } from "@prisma/client";
import prisma  from "../database/postgresql/connect.postgresql";
import Logger from "../lib/logger";
import { BadRequestResponse } from "../util/response/clientError.response";
import _ from "lodash";
import utilService from "./util.service";
import sendMailService from "./sendMail.service";
import util from "../util/function";

class UserService {
  async getUserByEmail(email: string, options: (keyof User)[] = []) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }
      return util.pickerOptions(user, options);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestResponse();
    }
  }

  async updateResetCode(
    email: string,
    otp: string,
    timeStep: number,
    options: (keyof User)[] = []
  ): Promise<Partial<User> | undefined> {
    try {
      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          resetCode: otp,
          resetCodeCreatedAt: timeStep,
        },
      });

      await sendMailService.sendMailTo(email, otp);

      if (!user) {
        return undefined;
      }
      if(user.resetCode){
        return util.pickerOptions(user, options);
      }
    } catch (error: any) {
      console.log(error.stack);

      Logger.error(error);
      throw new BadRequestResponse();
    }
  }

  async updatePassword(
    email: string,
    password: string,
    options: (keyof User)[] = []
  ) {
    try {
      const user = await prisma.user.update({
        where: { email },
        data: {
          password,
        },
      });

      return util.pickerOptions(user, options);
    } catch (error: any) {
      console.log(error.stack);

      Logger.error(error);
      throw new BadRequestResponse();
    }
  }
}

const userService = new UserService();
export default userService;
