import { Router } from "express";
import AppConfigEnv from "../config/app.config";
import authRouter from "./auth/auth.route";
import deviceDetectorMiddleware from "../middleware/deviceDetecto.middleware";

const appRouter = Router();

appRouter.route("/").get((_, res) => {
  res.send("Welcome to our app!");
});

export default appRouter;
