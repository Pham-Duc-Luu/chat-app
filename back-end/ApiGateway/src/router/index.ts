import { Router } from 'express';
import OAuhtRoute from './auth/auth.googe.route';
import authRouter from './auth/auth.route';

const appRouter = Router();
appRouter.use(authRouter);
appRouter.use(OAuhtRoute);
export default appRouter;
