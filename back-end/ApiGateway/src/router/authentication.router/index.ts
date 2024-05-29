import { Router } from 'express';
import sign_up from './sign-up';

const authRouter = Router();

authRouter.post('/sign-up', sign_up);

export default authRouter;
