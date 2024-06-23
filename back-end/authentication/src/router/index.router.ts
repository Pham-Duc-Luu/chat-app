import { Request, Response, Router } from "express";
import { config } from "dotenv";
import authRouter from "./auth.route";
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
appRouter.post("/generate-token", userController.createToken);

appRouter.route("/login").post(async (req: Request, res: Response) => {
  // logic for login method goes here...

  // store the userId and user's email in the session
  req.session.userId = "123";
  req.session.email = "email";

  res.send(req.session);
});

export default appRouter;
