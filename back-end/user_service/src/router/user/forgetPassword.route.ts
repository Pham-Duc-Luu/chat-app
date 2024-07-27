import { Handler, Router } from "express";
import { IRouter } from "../../util/interface/router.interface";
import forgotPasswordController from "../../controller/forgotpassword.controller";

const forgotPassword = Router();

forgotPassword
  .route("/users/forgot-password")
  .post(forgotPasswordController.resetPassword);
forgotPassword.route("/user/sendCode").post(forgotPasswordController.sendCode);
export default forgotPassword;
