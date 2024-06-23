import { Request, Response, Router } from "express";
import { config } from "dotenv";
import ApiKey from "../middleware/apikey.middleware";
import app_config from "../config/app.config";
import userRouter from "./user/user.route";

const appRouter = Router();

appRouter.use(userRouter);
export default appRouter;
