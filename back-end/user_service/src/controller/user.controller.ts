import { Request, Response } from "express";
import { createUser, getID } from "../service/user.service";
import bcrypt from "bcrypt";
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
import util from "../util/function";
import _ from "lodash";
import Logger from "../lib/logger";
import { InternalServerErrorResponse } from "../util/response/serverError.response";
import prisma from "../database/postgresql/connect.postgresql";
import AppConfigEnv from "../config/app.config";

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
    res: TypedResponse<HttpResponse | SuccessResponse<ICreateUser>>
  ) => {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.json(new BadRequestResponse("Missing Parameters"));
      }

      if (
        valid.isValidEmail(email) &&
        valid.isValidPassword(password) &&
        valid.isValidUserName(username)
      ) {
        return res.json(new BadRequestResponse("Invalid paramters"));
      }

      // * find if user is already existing
      if (
        await prisma.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        })
      ) {
        return res.json(
          new BadRequestResponse("email or username have already exist!")
        );
      }

      // * create new user
      return res.json(
        new OkResponse(
          await prisma.user.create({
            data: {
              username,
              email,
              password: bcrypt.hashSync(password, AppConfigEnv.SALTROUND),
            },
            select: {
              username: true,
              email: true,
              id: true,
            },
          })
        )
      );
    } catch (error: any) {
      Logger.error(error);
      return res.json(new InternalServerErrorResponse());
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
