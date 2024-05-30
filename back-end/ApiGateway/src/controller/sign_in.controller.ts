import { Request, Response } from "express";
import userService from "../services/user.service";
import { log } from "console";
import {
  TypedRequestBody,
  TypedResponse,
} from "../util/interface/express.interface";
import {
  ClientErrorResponse,
  HttpResponse,
  SuccessResponse,
} from "../util/response/http.response";
import { BadRequestResponse } from "../util/response/clientError.response";
import { Logger } from "winston";
import { OkResponse } from "../util/response/successful.response";

interface IReqLogin {
  email: string;
  password: string;
}

/**
 *
 * @param email
 * @param password
 * @returns { data : { accessToken: string}}
 */
export const loginUser = async (
  req: TypedRequestBody<IReqLogin>,
  res: TypedResponse<SuccessResponse<{ accessToken: string }> | HttpResponse>
) => {
  const { email, password } = req.body;

  let response: HttpResponse | SuccessResponse<{ accessToken: string }> =
    new HttpResponse();

  try {
    if (!email || !password) {
      response = new BadRequestResponse();
      return res.json(response);
    }

    // TODO: get id of user from user service
    const auth_id = await userService.get_id(email);

    // TODO : generate access token from auth service by id and email
    const accessToken = await userService.genToken({ email, id: auth_id });
    response = new OkResponse(accessToken);
  } catch (error: any) {
    console.log(error.stack);
  }

  return res.json(response);
};
