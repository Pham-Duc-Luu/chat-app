import { Router } from "express";
import forgotPasswordController from "../controller/forgotpassword.controller";

const forgotPasswordRouter = Router();

forgotPasswordRouter.post("/send-code", forgotPasswordController.sendCode);

forgotPasswordRouter.post(
    "/reset-code",
    forgotPasswordController.resetPassword
);

export default forgotPasswordRouter;
