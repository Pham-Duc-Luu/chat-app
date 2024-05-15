import express, { Router, Request, Response } from "express";
import userController from "../controller/user.controller";

const userRouter: Router = express.Router();

userRouter.post('/create-user', userController.createUserService);
export default userRouter;
