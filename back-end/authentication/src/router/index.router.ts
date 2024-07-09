import { Request, Response, Router } from 'express';
import { config } from 'dotenv';
import userController from '../controller/user.controller';
import userApiKeyMiddleware from '../middleware/apiKey.middleware';
import geneTokenRouter from './geneToken.router';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    email?: string;
  }
}

const appRouter = Router();
appRouter.use(geneTokenRouter);

export default appRouter;
