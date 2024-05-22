import { NextFunction, Request, Response } from "express";
import app_config from "../config/app.config";
import {
    Forbidden,
    HttpErrorResponse,
    Unauthorized,
} from "../util/response/error";

export default function userApiKeyMiddleware  (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            throw new Unauthorized();
        }

        if (apiKey !== app_config.app.apiKey?.userService) {
            throw new Forbidden();
        }
        next();
    } catch (error: any) {
        const err = new HttpErrorResponse(error.message, error.statuCode);
        return res.status(err.statuCode).json(err.message);
    }
};
