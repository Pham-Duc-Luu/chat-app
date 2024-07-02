import { Request, Response, Router } from 'express';
import { TypedRequestQueryBody } from '../../util/interface/express.interface';
import userController from '../../controller/user.controller';

const findUser = Router();

/**
 * @swagger
 * /users/find-users:
 *   get:
 *     summary: Find users by email or username
 *     description: Retrieve a list of users based on email or username.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: User's email address
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: User's username
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   avatar:
 *                     type: string
 *       400:
 *         description: Bad request due to invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 */

findUser.route('/users/find-users/').get(userController.findUsers);

export default findUser;
