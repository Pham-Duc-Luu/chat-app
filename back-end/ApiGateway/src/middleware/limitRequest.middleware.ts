import express, { Request, Response, NextFunction } from 'express';
import RestrictRequestModel from '../model/request.model';

/**
 * Function to create request limiter middleware
 *
 * @param limit : Number of requests allowed within the specified interval
 * @param interval : Time interval (in milliseconds) after which the request count is cleared
 * @returns Middleware function to limit the number of requests
 */
export default function createRequestLimiter(limit: number, interval: number) {
  setInterval(async () => {
    try {
      await RestrictRequestModel.updateMany({}, { countRequest: 0 });
      console.log('Request counts have been reset.');
    } catch (error) {
      console.error('Error resetting request counts:', error);
    }
  }, interval);

  return async function requestLimiterMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const clientIP =
        (req.headers['x-forwarded-for'] as string) ||
        req.socket.remoteAddress ||
        '';
      const ip = clientIP as string;

      // Check request count from database
      let Req = await RestrictRequestModel.findOne({ ip: ip });
      if (!Req) {
        Req = new RestrictRequestModel({ ip: ip, countRequest: 0 });
      }

      // Increment the request count
      let count = Req.countRequest as number;
      count += 1;
      Req.countRequest = count;
      console.log(count);

      if (count > limit) {
        // return res.status(429).json({
        //   message: "Too many requests, please try again later.",
        // });
      }

      await Req.save();
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}
