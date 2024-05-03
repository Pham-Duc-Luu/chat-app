import { Request, Response } from 'express';
import { config } from 'dotenv';
import { connectDB } from '../database/mongodb/connect.mongo';
import UserModel from '../models/User.model';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import {
  BadRequest,
  ErrorResponse,
  IErrorResponse,
  Unauthorized,
} from '../utils/Error/ErrorReponse';
import tokenService from '../services/token.service';

interface ISignInReq {
  email: string;
  id: string;
}
class AuthController {
  async sign_up(request: Request<any, any, ISignInReq>, response: Response) {
    try {
      const api_key = request.headers['x-api-key'];
      const { email, id } = request.body;
      const apiKey = process.env.API_KEY || 'api-key';

      if (!api_key) {
        throw new BadRequest('missing api key');
      }

      if (apiKey !== api_key) {
        throw new Unauthorized();
      }

      // con st existingUser = await UserModel.findOne({ email });
      const createUser = await tokenService.createToken(email, id);
    } catch (error: any) {
      const Err = new ErrorResponse(error.message, error.statusCode);
      return response.status(Err.statusCode).json({ message: Err.message });
    }

    // try {
    //   const api_key = request.headers["x-api-key"];
    //   config();
    //   const apiKey = process.env.API_KEY;
    //   if (!api_key){
    //      return res.status(401).json({ error: "API key is required" });
    //   }else {
    //     if (apiKey !== api_key){
    //       return res.status(401).json({ error: "Invalid API key" });
    //     }
    //   }
    //   const {email, id} = request.body;
    //   const connectionResult = await connectDB();
    //   if (connectionResult !== 'Connected to Mongo'){
    //     return res.status(500).json({ error: "Database connection error" });
    //   }
    //   const existingUser = await UserModel.findOne({ email });
    //   if (existingUser) {
    //     return res.status(409).json({ error: "Email already exists" });
    //   }
    //   const accessTokenSecret = process.env.ACCESS as Secret;
    //   const refreshTokenSecret = process.env.REFRESH  as Secret;
    //   const accessToken = jwt.sign({ email, id }, accessTokenSecret, {
    //     expiresIn: "15m",
    //   });
    //   const refreshToken = jwt.sign({ email, id }, refreshTokenSecret);
    //   const newUser = new UserModel({ email, id, accessToken, refreshToken });
    //   await newUser.save();
    //   return res
    //     .status(200)
    //     .json({ message: "Sign-up successfull", accessToken, refreshToken });
    // } catch (error) {
    //   console.error("Error during sign-up:", error);
    //   return res.status(500).json({ error: "Internal server error" });
    // }
  }
}

const authController = new AuthController();
export default authController;
