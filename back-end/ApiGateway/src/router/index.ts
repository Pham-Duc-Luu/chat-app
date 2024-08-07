import {Router} from 'express';
import OAuthGoogle from './auth/auth.googe.route';
import authRouter from './auth/auth.route';
import changePassRoute from './auth/auth.resetPassword';

const appRouter = Router();
appRouter.use(authRouter);
appRouter.use(OAuthGoogle);
appRouter.use(changePassRoute);
export default appRouter;
