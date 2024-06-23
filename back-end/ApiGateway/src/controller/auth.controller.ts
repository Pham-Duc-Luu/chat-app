import { Router, Request } from "express";
import { TypedResponse } from "../util/interface/express.interface";

class AuthController {
  public signUp(req: Request, res: TypedResponse<{ id: string }>) {
    return res.json({ id: "" });
  }
}

const authController = new AuthController();
export default authController;
