import { Router } from 'express';
import authRouter from './authentication.router';

const appRouter = Router();

appRouter.use('/auth', authRouter);

export default appRouter;
