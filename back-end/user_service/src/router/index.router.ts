import { Request, Response, Router } from "express";
import { config } from "dotenv";
import forgotPasswordRouter from "./forgotpassword.router";
const appRouter = Router();

appRouter.use(forgotPasswordRouter);
export default appRouter;
