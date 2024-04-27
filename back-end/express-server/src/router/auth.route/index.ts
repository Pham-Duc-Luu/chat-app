import { Router } from "express";
import authController from "../../controller/auth.controller";

const authRouter = Router();

// TODO: create a sign-up route
authRouter.post("/sign-up", authController.sign_up);
authRouter.post("/sign-in");

export default authRouter;
