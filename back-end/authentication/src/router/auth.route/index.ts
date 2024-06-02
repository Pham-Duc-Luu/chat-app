import { Router } from 'express';
import authController from '../../controller/auth.controller';
import authGoogle from '../auth.route/google'
const authRouter = Router();

// TODO: create a sign-up route
authRouter.post('/sign-up', function signUp() {});

// use middleware authGoogle
authRouter.use('/google',authGoogle);

export default authRouter;
