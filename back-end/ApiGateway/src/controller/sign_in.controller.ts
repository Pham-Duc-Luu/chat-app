import { Request, Response } from "express";
import userService from "../services/user.service";
import { log } from "console";

interface IReqLogin {
    email: string,
    password: string
}
export const loginUser = async (req: Request<any, any, IReqLogin>, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({message: "Missing email or password"});
  }
  try {

    // TODO: get id of user from user service
    const auth_id = await userService.get_id(email);
    
    // TODO : generate access token from auth service by id and email 
    const accessToken = await userService.genToken({ email, id : auth_id });
    res.json(accessToken);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
