import { NextFunction, Request, Response } from "express";

import { any } from "zod";
import Logger from "../lib/logger";
import { TypedResponse } from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  HttpResponse,
} from "../util/response/http.response";
import {
  BadRequestResponse,
  UnauthorizedResponse,
} from "../util/response/clientError.response";

export default function ApiKey(
  req: Request,
  res: TypedResponse<ClientErrorResponse>,
  next: NextFunction
) {
  try {
    const api_key = req.headers["x-api-key"];
    const apikey = process.env.API_Key || "api-key";
    if (!api_key) {
      throw new BadRequestResponse("Missing x-api-key");
    }

    if (api_key !== apikey) {
      throw new UnauthorizedResponse("No Access");
    }
    next();
  } catch (error: any) {
    console.log(error.stack);
    Logger.error(error.stack);
  }
}
