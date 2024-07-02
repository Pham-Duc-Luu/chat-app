import { Router } from 'express';
import authRouter from './auth/auth.route';
import OAuhtRoute from './auth/auth.googe.route';

const appRouter = Router();

appRouter.use(OAuhtRoute);
appRouter.use(authRouter);

export default appRouter;
