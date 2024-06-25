import { Request, Response } from "express";
import { createUser, getID } from "../service/user.service";

import valid from "../service/valid.service";
import { BadRequestResponse } from "../util/response/clientError.response";
import { TypedResponse } from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  HttpResponse,
  ServerErrorResponse,
  SuccessResponse,
  TypedRequestBody,
} from "../util/response/http.response";
import { OkResponse } from "../util/response/successful.response";
import { User } from "@prisma/client";
import { prisma } from "../database/postgresql/connect.postgresql";
import util from "../util/function";
import _ from "lodash";
import Logger from "../lib/logger";
import { InternalServerErrorResponse } from "../util/response/serverError.response";

interface IUser {
  username: string;
  password: string;
  email: string;
}
interface IUserID {
  email: string;
}

type ICreateUser = Pick<User, "email" | "id" | "username">;

class Controller {
  /**
   * create a new user
   * @param email
   * @param username
   * @param password
   *
   */
  createUserService = async (
    req: TypedRequestBody<IUser>,
    res: Response<
      ClientErrorResponse | ServerErrorResponse | SuccessResponse<ICreateUser>
    >
  ) => {
    try {
      const { username, password, email } = req.body;

      // * Missing parameter
      if (!username || !password || !email) {
        let _res = new BadRequestResponse();
        return res
          .status(_res.statusCode)
          .json({ ..._res, message: "Missing parameter" });
      }

      // * check form of email and password and username return true if correct form
      if (
        valid.isValidEmail(email) &&
        valid.isValidPassword(password) &&
        valid.isValidUserName(username)
      ) {
        const existUser = await prisma.user.findFirst({
          where: { email: email },
        });
        if (!existUser) {
          let _res = new BadRequestResponse();
          return res
            .status(_res.statusCode)
            .json({ ...res, message: "Email is already in use" });
        }
        let newUser = await prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });

        let _res = new OkResponse<ICreateUser>(
          util.pick(newUser, ["email", "id", "username"])
        );

        return res.status(_res.statusCode).json(_res);
      } else {
        let _res = new BadRequestResponse();
        return res
          .status(_res.statusCode)
          .json({ ..._res, message: "Invalid email or password" });
      }
    } catch (error: any) {
      Logger.error(error);
      let _res = new InternalServerErrorResponse();
      return res.status(_res.statusCode).json(_res);
    }
  };

  getUserID = async (
    req: Request<any, any, IUserID>,
    res: TypedResponse<SuccessResponse<{ id: number } | ClientErrorResponse>>
  ) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new BadRequestResponse("Missing email");
      }
      if (valid.isValidEmail(email)) {
        const id = await getID(email);
        res.json(new OkResponse({ id }));
      }
    } catch (error) {
      console.log(error);

      res.json(new BadRequestResponse());
    }
  };
}

const userController = new Controller();
export default userController;
