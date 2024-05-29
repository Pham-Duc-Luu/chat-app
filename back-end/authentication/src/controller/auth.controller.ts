import { Request, Response } from "express";
import { config } from "dotenv";
import { BadRequest, Unauthorized } from "../util/response/error";

interface ISignInReq {
  email: string;
  id: string;
}
class AuthController {
  async sign_up(req: Request<any, any, ISignInReq>, res: Response) {
    try {
      const api_key = req.headers["x-api-key"];
      const { email, id } = req.body;
      const apiKey = process.env.API_KEY || 'api-key';
      if (!api_key) {
        throw new BadRequest("missing api key");
      }

      if (apiKey !== api_key) {
        throw new Unauthorized("Not Permittion");
      }
      
    } catch (error) {

    }
  }
}

const authController = new AuthController();
export default authController;
