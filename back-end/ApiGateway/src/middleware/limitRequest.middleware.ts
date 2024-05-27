import express, { Request, Response, NextFunction } from "express";
import { TooManyRerquest } from "../util/response/client_error.response";

/**
 * Function to create request limiter middleware
 * 
 * @param limit : Number of requests allowed within the specified interval
 * @param interval : Time interval (in milliseconds) after which the request count is cleared
 * @returns Middleware function to limit the number of requests
 */
export default function createRequestLimiter(limit: number, interval: number) {
  const requestCounts: Map<string, number> = new Map();

  setInterval(() => {
    requestCounts.clear();
  }, interval);

  return function requestLimiterMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        console.log(clientIP as string);
        const count = requestCounts.get(clientIP as string) || 0;
        if (count < limit) {
            requestCounts.set(clientIP as string, count + 1);
              next();
        } else {
            throw new TooManyRerquest();
        }
    } catch (error: any) {
        console.log(error);
        return res.json({
            message: error.message,
        });
    }
  };
}

