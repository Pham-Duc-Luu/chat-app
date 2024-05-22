import { User } from "@prisma/client";
import { prisma } from "../database/postgresql/connect.postgresql";
import Logger from "../lib/logger";
import { BadRequest } from "../util/response/client_error.response";
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
            throw new BadRequest();
        }
    }

    async updateResetCode(
        email: string,
        resetCode: string,
        options: (keyof User)[] = []
    ): Promise<Partial<User> | undefined> {
        try {
            const user = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    resetCode,
                    resetCodeCreatedAt: String(Date.now()),
                },
            });

            await sendMailService.sendMailTo(email, resetCode);

            if (!user) {
                return undefined;
            }
            return util.pickerOptions(user, options);
        } catch (error: any) {
            console.log(error.stack);

            Logger.error(error);
            throw new BadRequest();
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
            throw new BadRequest();
        }
    }
}

const userService = new UserService();
export default userService;
