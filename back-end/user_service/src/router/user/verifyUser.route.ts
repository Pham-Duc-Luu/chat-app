import { Router } from 'express';
import verify from '../../controller/verify.controller';

const verifyRoute = Router();

/**
 * @swagger
 * /verify-account:
 *   get:
 *     summary: Verify a user account
 *     description: Verifies a user account based on email and password.
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
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Successfully verified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: user@example.com
 *       400:
 *         description: Bad request. Missing email or password, or invalid email/password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Missing email or password.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Internal server error.
 */

verifyRoute.get('/verify-account', verify.verifyUserAccount);

export default verifyRoute;
