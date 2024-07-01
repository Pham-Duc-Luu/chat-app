import { Router } from 'express';
import AppConfigEnv from '../config/app.config';
import authRouter from './auth/auth.route';
import deviceDetectorMiddleware from '../middleware/deviceDetecto.middleware';
import OAuhtRoute from './auth/auth.googe.route';

const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(OAuhtRoute);

export default appRouter;
