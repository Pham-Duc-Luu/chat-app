import { Request, Response, Router } from "express";
import { config } from "dotenv";
import userController from "../controller/user.controller";
import userApiKeyMiddleware from "../middleware/apiKey.middleware";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
  }
}

const appRouter = Router();

/**
 * Middleware to check api-key (permission to use other services)
 */
appRouter.use(userApiKeyMiddleware);
/**
 * Generate a pair token
 */

appRouter.post("/generate-jwt-token", userController.createRefreshToken);

export default appRouter;
