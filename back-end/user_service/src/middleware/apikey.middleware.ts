import { NextFunction, Request, Response } from 'express';

import { any } from 'zod';
import Logger from '../lib/logger';
import { TypedResponse } from '../util/interface/express.interface';
import {
  ClientErrorResponse,
  HttpResponse,
} from '../util/response/http.response';
import {
  BadRequestResponse,
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../util/response/clientError.response';
import AppConfigEnv from '../config/app.config';
import { ServiceUnavailableResponse } from '../util/response/serverError.response';

export default function verifyApiKey(
  req: Request,
  res: TypedResponse<ClientErrorResponse>,
  next: NextFunction
) {
  try {
    const api_key = req.headers['x-api-key'];
    if (!api_key) {
      return res.json(new ForbiddenResponse('No api key'));
    }

    if (api_key !== AppConfigEnv.SERVER_KEY) {
      return res.json(new UnauthorizedResponse('No Access'));
    }
    next();
  } catch (error: any) {
    Logger.error(error);
    return res.json(new ServiceUnavailableResponse());
  }
}
