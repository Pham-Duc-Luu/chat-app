import { NextFunction, Request, Response } from "express";
import {
  BadRequest,
  Unauthorized,
} from "../util/response/client_error.response";
import { any } from "zod";

export default function ApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const api_key = req.headers["x-api-key"];
    const apikey = process.env.API_Key || "api-key";
    if (!api_key) {
      throw new BadRequest("Missing x-api-key");
    }

    if (api_key !== apikey) {
      throw new Unauthorized("No Access");
    }
    next();
  } catch (error: any) {
    console.log(error.stack);
    return res.json({
      message: error.message,
    });
  }
}
