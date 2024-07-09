import passport, {use} from 'passport';
import {Strategy as GoogleStrategy, Profile} from 'passport-google-oauth20';
import AppConfigEnv from '../../config/app.config';
import {Response, Router} from 'express';
import authController from '../../controller/auth.controller';
import {User} from '../../services/user.service/type';
import userService from '../../services/user.service';
import {ApiResponse} from '../../util/function/response';
import Logger from '../../lib/logger';
import {
    BadGatewayResponse,
    InternalServerErrorResponse,
} from '../../util/response/serverError.response';
import crypto from 'crypto';
import {BadRequestResponse} from '../../util/response/clientError.response';
import authService from '../../services/authentication.service';
import {OkResponse} from '../../util/response/successful.response';
import {
    ICreateToken,
    IToken,
} from '../../services/authentication.service/type';
import {AxiosError} from 'axios';
import {HttpResponse} from '../../util/response/http.response';

const OAuhtRoute = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: AppConfigEnv.GOOGLE_CLIENT_ID,
            clientSecret: AppConfigEnv.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${AppConfigEnv.APP_PORT}${AppConfigEnv.APP_BASE_URL}${AppConfigEnv.GOOGLE_CALLBACK_URL}`,
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google OAuth login
 *     description: Initiates Google OAuth authentication process.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication.
 */
OAuhtRoute.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);

OAuhtRoute.get(
    AppConfigEnv.GOOGLE_CALLBACK_URL,
    passport.authenticate('google', {failureRedirect: '/error', successRedirect: AppConfigEnv.CLIENT_HOME_URL}),
);

OAuhtRoute.get('/auth/google/login/success',
    async function (req, res, next) {
        try {

            // * take the user profile in google oauth2

            const {_json} = req.user as Profile;
            const {Client} = req.body;
            const user: Partial<User> = {
                firstName: _json.given_name,
                lastName: _json.family_name,
                avatar: _json.picture,
                email: _json.email,
                username: _json.name,
                password: '@Google1#' + crypto.randomBytes(4),
            };


            // * find if the email had been used or not
            let existUser = (
                await userService.findUsers({
                    email: user.email,
                })
            ).data.data;

            // * if the email hadnot been used then create a new user
            if (!existUser || existUser.length === 0 || !existUser[0]) {
                let newUser = (await userService.createUser(user)).data.data;
                if (!newUser) {
                    Logger.error('User service is not available');
                    return ApiResponse(res, new BadRequestResponse());
                }

                // * create refresh token and access token
                let token = (
                    await authService.createToken({
                        ...newUser,
                        ipAddress: Client?.ip,
                        browserName: Client?.browser,
                        osName: Client?.device,
                    })
                ).data.data;

                if (!token) {
                    Logger.error('Authentication service is not available');
                    return ApiResponse(res, new BadRequestResponse());
                }
                return ApiResponse(
                    res,
                    new OkResponse<{ token: IToken; user: Partial<User> }>({
                        token,
                        user: newUser,
                    })
                );
            }

            // * create refresh token and access token
            let token = (
                await authService.createToken({
                    ...existUser[0],
                    ipAddress: Client?.ip,
                    browserName: Client?.browser,
                    osName: Client?.device,
                })
            ).data.data;
            if (!token) {
                Logger.error('Authentication service is not available');
                return ApiResponse(res, new BadRequestResponse());
            }
            return ApiResponse(res, new OkResponse<{ token: IToken; user: Partial<User> }>({
                token,
                user: existUser[0]
            }));
        } catch (error: any) {
            console.log(error.stack)
            Logger.error(error);

            if (error instanceof AxiosError) {
                let response = error.response?.data as HttpResponse;
                if (response.statusCode < 500) {
                    return ApiResponse(
                        res,
                        new BadRequestResponse(error.response?.data.message)
                    );
                }
            }
            return res.json(new BadGatewayResponse());
        }
    }
)
OAuhtRoute.get('/error', (req, res) => res.send('error logging in'));

export default OAuhtRoute;
