import { Router } from 'express';
import geoip from 'geoip-lite';
import authController from '../../controller/auth.controller';
const authRouter = Router();

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: User sign-up
 *     description: Create a new user account.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               username:
 *                 type: string
 *                 description: User's username
 *               Client:
 *                 type: object
 *                 properties:
 *                   ip:
 *                     type: string
 *                     description: Client IP address
 *                   browser:
 *                     type: string
 *                     description: Client browser name
 *                   device:
 *                     type: string
 *                     description: Client device name
 *     responses:
 *       200:
 *         description: Successfully created user and generated token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       400:
 *         description: Bad request due to missing parameters or invalid input.
 *
 *
 *
 *       502:
 *         description: Bad gateway due to server error.
 *
 */
authRouter.route('/auth/sign-up').all(authController.signUp);

authRouter.route('/auth/sign-in').all(authController.signIn);

export default authRouter;
