import { Router } from "express";
import authRouter from "./authentication.router/index";
import app_config from "../config/server.config";

export class AppRouter {
  private baseUrl: string = app_config.app.baseUrl;
  private _router: Router = Router().use(this.baseUrl);

  private setAuthRouter = () => {
    this._router.use(authRouter.router());
  };

  public router = () => {
    return this._router;
  };
}

const appRouter = new AppRouter();
export default appRouter;
