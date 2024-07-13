import {Router} from 'express';
import OAuthGoogle from './auth/auth.googe.route';
import authRouter from './auth/auth.route';

const appRouter = Router();
appRouter.use(authRouter);
appRouter.use(OAuthGoogle);
export default appRouter;
