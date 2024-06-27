import { Request, Response } from "express";
import tokenService from "../service/token";
import { any } from "zod";
import UserModel from "../models/User.model";
import {
  TypedRequestBody,
  TypedResponse,
} from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  HttpResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../util/response/http.response";
import { BadRequestResponse } from "../util/response/clientError.response";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

interface ICreateToken {
  email: string;
  id: number;
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
      const { email, id, username, osName, browserName, ipAddress } = req.body;

      if (!email || !username || !id) {
        return res.json(new BadRequestResponse("Missing email or username"));
      }

      // * check if the user has already exsist
      let existUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              id,
            },
            {
              username,
            },
          ],
        },
      });
      if (!existUser) {
        existUser = await prisma.user.create({
          data: {
            email,
            id,
            username,
          },
        });
      }

      const accessToken = jwt.sign(
        {
          id: existUser.id,
          email: existUser.email,
          username: existUser.username,
        },
        existUser.publicKey,
        { expiresIn: existUser.accessTokenExpIn }
      );

      const refreshToken = jwt.sign(
        {
          id: existUser.id,
          email: existUser.email,
          username: existUser.username,
        },
        existUser.privateKey,
        { expiresIn: existUser.refreshTokenExpIn }
      );

      const newFreshToken = await prisma.user.update({
        where: {
          id: existUser.id,
        },
        data: {
          devices: {
            update: {
              data: {
                browserName: "c",
              },
            },
          },
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };
}

const userController = new UserController();
export default userController;
