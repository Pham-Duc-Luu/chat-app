import { Request, Response } from 'express';
import {
  TypedRequestBody,
  TypedResponse,
} from '../util/interface/express.interface';
import { User } from '@prisma/client';
import { ApiResponse } from '../util/function/response';
import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from '../util/response/http.response';
import { ServerResponse } from 'http';
import { BadRequestResponse } from '../util/response/clientError.response';
import { InternalServerErrorResponse } from '../util/response/serverError.response';
import Logger from '../lib/logger';
import prisma from '../database/postgresql/connect.postgresql';
import bcrypt from 'bcrypt';
import { OkResponse } from '../util/response/successful.response';
class Verify {
  public async verifyUserAccount(
    req: TypedRequestBody<Pick<User, 'email' | 'password'>>,
    res: TypedResponse<
      | ClientErrorResponse
      | ServerErrorResponse
      | SuccessResponse<Pick<User, 'id' | 'email' | 'avatar' | 'username'>>
    >
  ): Promise<typeof res> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return ApiResponse(
          res,
          new BadRequestResponse('Missing email or password')
        );
      }

      const user = await prisma.user.findFirst({
        where: { email: email },
        select: {
          id: true,
          email: true,
          password: true,
          avatar: true,
          username: true,
        },
      });

      if (!user) {
        return ApiResponse(res, new BadRequestResponse('Email not found'));
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return ApiResponse(
          res,
          new BadRequestResponse('Password is incorrect')
        );
      }

      return ApiResponse(
        res,
        new OkResponse<Pick<User, 'id' | 'email' | 'avatar' | 'username'>>({
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
        })
      );
    } catch (error: any) {
      Logger.error(error);
      return ApiResponse(res, new InternalServerErrorResponse());
    }
  }
}

const verify = new Verify();
export default verify;
