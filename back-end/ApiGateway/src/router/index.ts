import { Router } from 'express';
import authRouter from './authentication.router/index';
import { loginUser } from '../controller/sign_in.controller';
import createRequestLimiter from '../middleware/limitRequest.middleware';

const appRouter = Router();
const requestLimiter = createRequestLimiter(100, 3600000);

appRouter.use(requestLimiter);
appRouter.post('/login', loginUser);

export default appRouter;
