import { NextFunction, Request, Response } from "express";
import app_config from "../config/app.config";
import { BadRequestResponse } from "../util/response/clientError.response";
import { ClientErrorResponse } from "../util/response/http.response";

/**
 * Middleware to check for a valid API key in the request headers.
 *
 * This middleware function checks if the request contains a valid API key in the headers.
 * If the API key is missing or invalid, it throws an appropriate error.
 * If the API key is valid, it passes control to the next middleware or route handler.
 */
export default function userApiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      throw new BadRequestResponse("Unauthorized");
    }

    if (apiKey !== app_config.app.key.apiKey?.userService) {
      throw new BadRequestResponse("No Permission");
    }
    next();
  } catch (error: any) {
    const err = new ClientErrorResponse(error.message, error.statuCode);
    return res.status(err.statusCode).json(err.message);
  }
}
