import { Request, Response } from "express";
import { MissingParameter } from "../util/response/error";
import tokenService from "../service/token";
import { any } from "zod";
interface ICreateToken {
    email: string,
    id: number,
}
class UserController {
    createToken = async (req: Request<any, any, ICreateToken>, res: Response) => {
        try {
            const {email, id} = req.body;
            if (!email || !id) {
                throw new MissingParameter("Missing email or id");
            }
            const b = tokenService.createToken(email, id);
            res.json({b});
        } catch (error:any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}

const userController = new UserController();
export default userController;
