import { Request, Response, Router } from "express";
import { config } from "dotenv";
import authRouter from "./auth.route";
import userController from "../controller/user.controller";
import userApiKeyMiddleware from "../middleware/apiKey.middleware";

const appRouter = Router();

/**
 * Generate a pair token
 */
appRouter.use(userApiKeyMiddleware);
appRouter.post("/generate-token", userController.createToken);

export default appRouter;
