import { Handler, RequestHandler, Router } from "express";

export abstract class IRouter {
  protected baseUrl: string = "";
  protected _router: Router = Router();

  protected setUse(...args: Parameters<typeof this._router.use>) {
    return this._router.use(...args);
  }

  protected setPost(args: Parameters<typeof this._router.post>) {
    return this._router.post(...args);
  }

  protected setGet(...args: Parameters<typeof this._router.get>) {
    return this._router.get(...args);
  }
  protected setPut(...args: Parameters<typeof this._router.put>) {
    return this._router.put(...args);
  }
  protected setPatch(...args: Parameters<typeof this._router.patch>) {
    return this._router.patch(...args);
  }
  protected setDelete(...args: Parameters<typeof this._router.delete>) {
    return this._router.delete(...args);
  }

  protected setOptions(...args: Parameters<typeof this._router.options>) {
    return this._router.options(...args);
  }
  public router = () => {
    return this._router;
  };
}
