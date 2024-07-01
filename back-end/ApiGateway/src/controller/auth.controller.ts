import { Router, Request } from 'express';
import {
  TypedRequestBody,
  TypedResponse,
} from '../util/interface/express.interface';
import { TBrowser, TDeviceType } from '../lib/browser.name';
import { IClientInfo } from '../middleware/deviceDetecto.middleware';
import { IToken } from '../services/authentication.service/type';
import userService from '../services/user.service';
import { BadRequestResponse } from '../util/response/clientError.response';
import {
  ClientErrorResponse,
  HttpResponse,
  ServerErrorResponse,
} from '../util/response/http.response';
import authService from '../services/authentication.service';
import {
  BadGatewayResponse,
  ServiceUnavailableResponse,
} from '../util/response/serverError.response';
import AppConfigEnv from '../config/app.config';
import Logger from '../lib/logger';
import { ApiResponse } from '../util/function/response';
import { AxiosError } from 'axios';
import { OkResponse } from '../util/response/successful.response';
import { Profile } from 'passport';
import { User } from '../services/user.service/type';

class AuthController {
  public async signUp(
    req: TypedRequestBody<User & IClientInfo>,
    res: TypedResponse<ClientErrorResponse | ServerErrorResponse>
  ) {
    const { email, password, username, Client } = req.body;

    try {
      console.log(email, password, username, Client);

      if (!email || !password || !username) {
        return res.json(
          new BadRequestResponse('Missing email, password or username')
        );
      }

      if (AppConfigEnv.ENV === 'production' || !Client) {
        return res.json(
          new BadRequestResponse(
            'Client information is required in production environment'
          )
        );
      }

      let newUser = (
        await userService.createUser({
          email,
          password,
          username,
        })
      ).data.data;
      if (!newUser) {
        Logger.error('User service is not available');
        return ApiResponse(res, new BadRequestResponse());
      }

      let token = (
        await authService.createToken({
          ...newUser,
          ipAddress: Client.ip,
          browserName: Client.browser,
          osName: Client.device,
        })
      ).data.data;
      if (!token) {
        Logger.error('Authentication service is not available');
        return ApiResponse(res, new BadRequestResponse());
      }
      return ApiResponse(res, new OkResponse(token));
    } catch (error: any) {
      Logger.error(error);

      if (error instanceof AxiosError) {
        let response = error.response?.data as HttpResponse;
        if (response.statusCode < 500) {
          return ApiResponse(
            res,
            new BadRequestResponse(error.response?.data.message)
          );
        }
      }
      return res.json(new BadGatewayResponse());
    }
  }
}

const authController = new AuthController();
export default authController;
