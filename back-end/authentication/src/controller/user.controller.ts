import { Request, Response } from 'express';
import tokenService from '../service/token';
import { any } from 'zod';
import UserModel from '../models/User.model';
import {
  TypedRequestBody,
  TypedResponse,
} from '../util/interface/express.interface';
import {
  ClientErrorResponse,
  HttpResponse,
  ServerErrorResponse,
  SuccessResponse,
} from '../util/response/http.response';
import { BadRequestResponse } from '../util/response/clientError.response';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';
import jwtService from '../service/jwt.service';
import { OkResponse } from '../util/response/successful.response';
import Logger from '../lib/logger';
import { InternalServerErrorResponse } from '../util/response/serverError.response';

interface ICreateToken {
  email: string;
  id: number;
  avatar: string;
  username: string;
  osName: string;
  browserName: string;
  ipAddress: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}

class UserController {
  /**
   * Creates a new pair of tokens (access and refresh).
   * This function handles the request to create a new token pair for a user.
   * It expects the request body to contain an email and an id.
   * If either the email or id is missing, it throws a MissingParameter error.
   * Otherwise, it generates new tokens, updates the user's refresh token in the database,
   * and returns the access token in the response.
   * @param id
   * @param email
   */
  createRefreshToken = async (
    req: TypedRequestBody<ICreateToken>,
    res: TypedResponse<
      ClientErrorResponse | ServerErrorResponse | SuccessResponse<IToken>
    >
  ) => {
    try {
      const { email, id, username, osName, browserName, ipAddress, avatar } =
        req.body;

      if (!email || !username || !id) {
        return res.json(new BadRequestResponse('Missing email or username'));
      }

      if (!ipAddress) {
        return res.json(new BadRequestResponse('IP address'));
      }

      // * check if the user has already exsist
      let existUser = await prisma.user.findFirst({ where: { email: email } });
      if (!existUser) {
        existUser = await prisma.user.create({
          data: {
            email,
            id: Number(id),
            username,
          },
        });
      }

      // * generate access token and refresh token
      const tokens = await jwtService.generateTokenFromUser(existUser);

      // * create a record of device if it not already exists
      if (
        !(await prisma.device.findFirst({ where: { ipAddress: ipAddress } }))
      ) {
        await prisma.user.update({
          where: { email },
          data: {
            devices: {
              create: {
                ipAddress,
                osName,
                browserName,
              },
            },
          },
        });
      }

      const newTokens = await prisma.device.update({
        where: {
          ipAddress,
        },
        data: {
          refreshTokens: {
            create: {
              token: tokens.refreshToken,
              userId: existUser.id,
            },
          },
        },
      });

      return res.json(
        new OkResponse({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
        })
      );
    } catch (error: any) {
      console.log(error);
      Logger.error(error);

      return res.json(new InternalServerErrorResponse());
    }
  };
}

const userController = new UserController();
export default userController;
