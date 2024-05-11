import { Request, Response, Router } from "express";
import { config } from "dotenv";
import authRouter from "./auth.route";
import userController from "../controller/user.controller";
const appRouter = Router();

appRouter.use("/user/generate-token", userController.createToken);

export default appRouter;
