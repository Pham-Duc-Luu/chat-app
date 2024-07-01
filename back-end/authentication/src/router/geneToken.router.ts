import { Router } from "express";
import userController from "../controller/user.controller";

const geneTokenRouter = Router();

/**
 * @swagger
 * /generate-jwt-token:
 *   post:
 *     summary: Creates a new pair of tokens (access and refresh).
 *     description: |
 *       This endpoint creates a new pair of tokens (access and refresh) for a user. It expects the request body to contain an email, id, username, osName, browserName, and ipAddress. If any required parameters are missing, it returns a BadRequest response. Otherwise, it generates new tokens, updates the user's refresh token in the database, and returns the access token in the response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - id
 *               - username
 *               - osName
 *               - browserName
 *               - ipAddress
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *                 example: user@example.com
 *               id:
 *                 type: string
 *                 description: The unique identifier of the user.
 *                 example: 12345
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johndoe
 *               osName:
 *                 type: string
 *                 description: The name of the operating system.
 *                 example: Windows 10
 *               browserName:
 *                 type: string
 *                 description: The name of the browser.
 *                 example: Chrome
 *               ipAddress:
 *                 type: string
 *                 format: ipv4
 *                 description: The IP address of the user.
 *                 example: 192.168.1.1
 *     responses:
 *       200:
 *         description: Tokens generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The access token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refresh_token:
 *                   type: string
 *                   description: The refresh token.
 *                   example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
 *       400:
 *         description: Missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the missing parameters.
 *                   example: Missing email or username
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *                   example: Internal server error occurred.
 */
geneTokenRouter.post("/generate-jwt-token", userController.createRefreshToken);

export default geneTokenRouter;
