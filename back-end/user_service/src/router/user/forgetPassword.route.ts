import { Handler, Router } from "express";
import { IRouter } from "../../util/interface/router.interface";
import forgotPasswordController from "../../controller/forgotpassword.controller";

const forgotPassword = Router();
// change password with mail, OTP, new password
/*
 ex:
 {
    "email":"tmi.linhvtm@gmail.com",
    "resetCode": "123456",
    "newPassword":"mailinh2k3@"
 }
*/

forgotPassword
  .route("/user/forgot-password")
  .post(forgotPasswordController.resetPassword);

// send OTP to email
/*
  ex: "email": "tmi.linhvtm@gmail.com"
*/
forgotPassword.route("/user/sendCode").post(forgotPasswordController.sendCode);
export default forgotPassword;
