import { NextFunction, Request, Response } from 'express';
import app_config from '../config/app.config';
import {
  BadRequestResponse,
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../util/response/clientError.response';
import { ClientErrorResponse } from '../util/response/http.response';
import AppConfigEnv from '../config/app.config';
import { TypedResponse } from '../util/interface/express.interface';
import Logger from '../lib/logger';

/**
 * Middleware to check for a valid API key in the request headers.
 *
 * This middleware function checks if the request contains a valid API key in the headers.
 * If the API key is missing or invalid, it throws an appropriate error.
 * If the API key is valid, it passes control to the next middleware or route handler.
 */
export default function verifyApiKey(
  req: Request,
  res: TypedResponse<ClientErrorResponse>,
  next: NextFunction
) {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.json(new UnauthorizedResponse());
    }

    if (apiKey !== AppConfigEnv.SERVER_KEY) {
      return res.json(new ForbiddenResponse());
    }

    next();
  } catch (error: any) {
    Logger.error(error);

    return res.json(new ForbiddenResponse());
  }
}
