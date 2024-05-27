import { Request, Response } from "express";
import { MissingParameter } from "../util/response/error";
import tokenService from "../service/token";
import { any } from "zod";
import UserModel from "../models/User.model";
interface ICreateToken {
  email: string;
  id: number;
}
class UserController {
  /**
   * * create a new pair token
   */
  createToken = async (req: Request<any, any, ICreateToken>, res: Response) => {
    try {
      const { email, id } = req.body;

      
      if (!email || !id) {
        throw new MissingParameter("Missing email or id");
      }

      const {accessToken, refreshToken} = await tokenService.createToken(email, id);
      await new UserModel({ _id: id, refreshToken: refreshToken }).save();
      res.json({ accessToken });

    } catch (error: any) {
      console.log(error);   
      res.status(500).json({ message: error.message });
    }
  };
}

const userController = new UserController();
export default userController;
