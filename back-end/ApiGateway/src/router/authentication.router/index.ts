import { Router, Request, Response } from "express";
import authController from "../../controller/auth.controller";

export class AuthRouter {
  private baseUrl: string = "/auth";
  private _router: Router = Router().use(this.baseUrl);

  public signUp = (url: string = "/sign-up") => {
    this._router.post(url, authController.signUp);
  };

  public router = () => {
    return this._router;
  };
}

const authRouter = new AuthRouter();

export default authRouter;
