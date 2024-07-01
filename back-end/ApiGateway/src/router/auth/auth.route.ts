import { Router } from 'express';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';
import { TBrowser } from '../../lib/browser.name';
import authController from '../../controller/auth.controller';
const authRouter = Router();

authRouter.route('/auth/sign-up').post(authController.signUp);

export default authRouter;
