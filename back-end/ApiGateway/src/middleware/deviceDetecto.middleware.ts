import { Handler, NextFunction, Request, Response } from 'express';
import { ClientErrorResponse } from '../util/response/http.response';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';
import { TBrowser, TDeviceType } from '../lib/browser.name';
import AppConfigEnv from '../config/app.config';
import Logger from '../lib/logger';
import { TypedRequestBody } from '../util/interface/express.interface';

/**
 *  * detect the device that call our api
 */

export interface DeviceDetector {
  ip: string;
  browser?: TBrowser;
  device?: TDeviceType;
}

export interface IClientInfo {
  Client: DeviceDetector;
}
const deviceDetectorMiddleware = (
  req: Request<any, any, IClientInfo>,
  res: Response<ClientErrorResponse>,
  next: NextFunction
) => {
  const userAgent = req.headers['user-agent'];
  let ip = req.headers['x-forwarded-for'];
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
   */
  Logger.info({
    ip,
    browser: uaResult.browser.name,
    device: uaResult.device.type,
  });

  if (AppConfigEnv.ENV === 'development') {
    if (!ip) {
      ip = AppConfigEnv.TESTING_IP;
      req.body.Client = {
        ip: ip,
        browser: uaResult.browser.name as TBrowser,
        device: uaResult.device.type as TDeviceType,
      };
    }

    return next();
  }

  return res.json(new ClientErrorResponse('You can not be identified', 400));
};

export default deviceDetectorMiddleware;
