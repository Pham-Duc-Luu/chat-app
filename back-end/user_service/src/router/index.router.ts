import { Request, Response, Router } from 'express';
import { config } from 'dotenv';
import ApiKey from '../middleware/apikey.middleware';
import app_config from '../config/app.config';
import userRouter from './user/user.route';
import findUser from './user/findUser.route';
import verifyApiKey from '../middleware/apikey.middleware';
import verifyRoute from './user/verifyUser.route';
import forgotPassword from './user/forgetPassword.route';

const appRouter = Router();
appRouter.use(verifyApiKey);

appRouter.use(userRouter);
appRouter.use(findUser);
appRouter.use(verifyRoute);
appRouter.use(forgotPassword);

export default appRouter;
