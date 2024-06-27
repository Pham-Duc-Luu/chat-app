import { Router } from "express";
import geoip from "geoip-lite";
import UAParser from "ua-parser-js";
import { TBrowser } from "../../lib/browser.name";
const authRouter = Router();

authRouter.route("/auth/login");

export default authRouter;
