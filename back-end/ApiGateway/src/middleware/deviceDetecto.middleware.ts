import { NextFunction, Request, Response } from "express";
import { ClientErrorResponse } from "../util/response/http.response";
import geoip from "geoip-lite";
import UAParser from "ua-parser-js";
import { TBrowser } from "../lib/browser.name";
import AppConfigEnv from "../config/app.config";
import Logger from "../lib/logger";
/**
 *  * detect the device that call our api
 */
const deviceDetectorMiddleware = (
  req: Request,
  res: Response<ClientErrorResponse>,
  next: NextFunction
) => {
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-forwarded-for"];
  const geo = geoip.lookup(ip as string);
  // Parse user-agent string
  const parser = new UAParser();

  // * Get the request browser and device

  const uaResult = parser.setUA(userAgent as string).getResult();
  /**
   * if this is development environment,
   * we don't have to check the soucre that call our api
   * but in the production environment
   * we have to check the device that call our api
   *
   */
  Logger.info({ ip, browser: uaResult.browser.name, device: uaResult.device });

  if (AppConfigEnv.ENV === "development") {
    return next();
  }

  return res.json(new ClientErrorResponse("You can not be identified", 400));
};

export default deviceDetectorMiddleware;
