import { Request, Response } from "express";
import { createUser, getID } from "../service/user.service";

import valid from "../service/valid.service";
import { BadRequestResponse } from "../util/response/clientError.response";
import { TypedResponse } from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  HttpResponse,
  SuccessResponse,
} from "../util/response/http.response";
import { OkResponse } from "../util/response/successful.response";

interface IUser {
  username: string;
  password: string;
  email: string;
}
interface IUserID {
  email: string;
}
class Controller {
  createUserService = async (req: Request<any, any, IUser>, res: Response) => {
    try {
      const { username, password, email } = req.body;
      // * Missing parameter
      if (!username || !password || !email) {
        throw new BadRequestResponse("Missing Username or Password or Email");
      }
      // * check form of email and password and username return true if correct form
      if (
        valid.isValidEmail(email) &&
        valid.isValidPassword(password) &&
        valid.isValidUserName(username)
      ) {
        const b = await createUser(username, password, email);
        res.status(200).json({
          message: "User created successfully.",
          id: b,
        });
      } else {
        throw new BadRequestResponse(
          "Email or password or username is not valid"
        );
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: error.message });
    }
  };

  getUserID = async (
    req: Request<any, any, IUserID>,
    res: TypedResponse<SuccessResponse<{ id: number } | ClientErrorResponse>>
  ) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new BadRequestResponse("Missing email");
      }
      if (valid.isValidEmail(email)) {
        const id = await getID(email);
        res.json(new OkResponse({ id }));
      }
    } catch (error) {
      console.log(error);

      res.json(new BadRequestResponse());
    }
  };
}

const userController = new Controller();
export default userController;
