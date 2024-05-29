import { Request, Response } from "express";
import { createUser, getID } from "../service/user.service";
import {
  BadRequest,
  MissingParameter,
} from "../util/response/client_error.response";
import valid from "../service/valid.service";

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
        throw new MissingParameter("Missing Username or Password or Email");
      }
      // * check form of email and password and username return true if correct form 
      if (valid.isValidEmail(email) && valid.isValidPassword(password) && valid.isValidUserName(username)) {
        const b = await createUser(username, password, email);
        res.status(200).json({
          message: "User created successfully.",
          id: b,
        });
      } else {
        throw new BadRequest("Email or password or username is not valid");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: error.message });
    }
  };

  getUserID = async(req: Request<any, any, IUserID>, res: Response) => {
    try {
      
      const {email} = req.body;
      
      if (!email) {
        throw new MissingParameter("Missing email");
      }
      if (valid.isValidEmail(email)) {
        const id = await getID(email);
        res.status(200).json({
          id: id
        })
      }
    } catch (error) {
      console.log(error);
      
      res.status(500).json({message: "Get id error"})
    }
  }
}

const userController = new Controller();
export default userController;
