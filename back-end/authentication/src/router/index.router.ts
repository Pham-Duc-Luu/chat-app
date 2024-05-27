import { Request, Response, Router } from "express";
import { config } from "dotenv";
import authRouter from "./auth.route";
import userController from "../controller/user.controller";
const appRouter = Router();

/**
 * Generate a pair token
 */
appRouter.post("/generate-token", userController.createToken);

export default appRouter;
