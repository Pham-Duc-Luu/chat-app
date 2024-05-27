import { Router } from 'express';
import authRouter from './authentication.router/index';
import { loginUser } from '../controller/sign_in.controller';
const appRouter = Router();

appRouter.post('/login', loginUser);

export default appRouter;
