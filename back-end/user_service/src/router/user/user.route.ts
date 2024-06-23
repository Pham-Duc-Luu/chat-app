import { Handler, Router } from "express";
import userController from "../../controller/user.controller";
import { IRouter } from "../../util/interface/router.interface";

const userRouter = Router();

/**
 * @swagger
 * /users/create-new-user:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows for the creation of a new user.
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *                 description: The username for the new user.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *                 description: The email address for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecureP@ssw0rd!
 *                 description: The password for the new user.
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                   description: The ID of the newly created user.
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                   description: The username of the newly created user.
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@example.com
 *                   description: The email address of the newly created user.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *                   description: A description of the error that occurred.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid API key
 *                   description: A description of the authorization error.
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: X-API-Key
 */
userRouter
  .route("/users/create-new-user")
  .post(userController.createUserService);

export default userRouter;
