import { Request, Response, Router } from 'express';
import { config } from 'dotenv';
import authRouter from './auth.route';
const appRouter = Router();

// * router

// * authentication routers
appRouter.use('/auth', authRouter);

export default appRouter;
