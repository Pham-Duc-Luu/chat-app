import { Request, Response } from 'express';
import { createUser, getID } from '../service/user.service';
import bcrypt from 'bcrypt';
import valid from '../service/valid.service';
import { BadRequestResponse } from '../util/response/clientError.response';
import { TypedResponse } from '../util/interface/express.interface';
import {
  ClientErrorResponse,
  HttpResponse,
  ServerErrorResponse,
  SuccessResponse,
  TypedRequestBody,
} from '../util/response/http.response';
import { OkResponse } from '../util/response/successful.response';
import { User } from '@prisma/client';
import util from '../util/function';
import _ from 'lodash';
import Logger from '../lib/logger';
import { InternalServerErrorResponse } from '../util/response/serverError.response';
import prisma from '../database/postgresql/connect.postgresql';
import AppConfigEnv from '../config/app.config';
import { ApiResponse } from '../util/function/response';

interface IUserID {
  email: string;
}

type ICreateUser = Pick<User, 'email' | 'id' | 'username'>;

class Controller {
  /**
   * create a new user
   * @param email
   * @param username
   * @param password
   *
   */
  createUserService = async (
    req: TypedRequestBody<User>,
    res: TypedResponse<
      ClientErrorResponse | ServerErrorResponse | SuccessResponse<ICreateUser>
    >
  ) => {
    try {
      const {
        username,
        password,
        email,
        phoneNumber,
        avatar,
        firstName,
        lastName,
      } = req.body;

      if (!username || !password || !email) {
        return ApiResponse(
          res,
          new BadRequestResponse('Missing email,username or password')
        );
      }

      // * verify parameters
      if (!valid.isValidEmail(email)) {
        return ApiResponse(res, new BadRequestResponse('Invalid Email'));
      }

      if (!valid.isValidPassword(password)) {
        return ApiResponse(res, new BadRequestResponse('Invalid Password'));
      }

      if (!valid.isValidUserName(username)) {
        return ApiResponse(res, new BadRequestResponse('Invalid Username'));
      }

      if (
        await prisma.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        })
      ) {
        return ApiResponse(
          res,
          new BadRequestResponse('email or username have already exist!')
        );
      }

      // * create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          phoneNumber,
          firstName,
          lastName,
          avatar,
          password: bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(Number(AppConfigEnv.SALTROUND))
          ),
        },
        select: {
          username: true,
          email: true,
          id: true,
        },
      });

      return ApiResponse(res, new OkResponse(newUser));
    } catch (error: any) {
      Logger.error(error);
      return ApiResponse(res, new InternalServerErrorResponse());
    }
  };

  getUserID = async (
    req: Request<any, any, IUserID>,
    res: TypedResponse<SuccessResponse<{ id: number } | ClientErrorResponse>>
  ) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new BadRequestResponse('Missing email');
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
