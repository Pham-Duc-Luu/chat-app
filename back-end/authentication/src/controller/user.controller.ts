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
   * Creates a new pair of tokens (access and refresh).
   * This function handles the request to create a new token pair for a user.
   * It expects the request body to contain an email and an id.
   * If either the email or id is missing, it throws a MissingParameter error.
   * Otherwise, it generates new tokens, updates the user's refresh token in the database,
   * and returns the access token in the response.
   */
  createToken = async (req: Request<any, any, ICreateToken>, res: Response) => {
    try {
      const { email, id } = req.body;

      if (!email || !id) {
        throw new MissingParameter("Missing email or id");
      }

      const { accessToken, refreshToken } = await tokenService.createToken(
        email,
        id
      );
      await UserModel.findOneAndUpdate(
        { _id: id },
        { email, refreshToken },
        { new: true, upsert: true }
      );

      res.json({ accessToken });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

const userController = new UserController();
export default userController;
