import { Request, Response } from "express";
import tokenService from "../service/token";
import { any } from "zod";
import UserModel from "../models/User.model";
import {
  TypedRequestBody,
  TypedResponse,
} from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../util/response/http.response";
import { BadRequestResponse } from "../util/response/clientError.response";

interface ICreateToken {
  email: string;
  id: number;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}

class UserController {
  /**
   * Creates a new pair of tokens (access and refresh).
   * This function handles the request to create a new token pair for a user.
   * It expects the request body to contain an email and an id.
   * If either the email or id is missing, it throws a MissingParameter error.
   * Otherwise, it generates new tokens, updates the user's refresh token in the database,
   * and returns the access token in the response.
   * @param id
   * @param email
   */
  createToken = async (
    req: TypedRequestBody<ICreateToken>,
    res: Response<
      ClientErrorResponse | ServerErrorResponse | SuccessResponse<IToken>
    >
  ) => {
    try {
      const { email, id } = req.body;
    } catch (error: any) {
      console.log(error);
      res.status(500).json(new BadRequestResponse());
    }
  };
}

const userController = new UserController();
export default userController;
