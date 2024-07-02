import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import AppConfigEnv from '../../config/app.config';
import { Response, Router } from 'express';
import authController from '../../controller/auth.controller';
import { User } from '../../services/user.service/type';
import userService from '../../services/user.service';
import { ApiResponse } from '../../util/function/response';
import Logger from '../../lib/logger';
import { InternalServerErrorResponse } from '../../util/response/serverError.response';

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
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

OAuhtRoute.get(
  AppConfigEnv.GOOGLE_CALLBACK_URL,
  passport.authenticate('google', { failureRedirect: '/error' }),
  async function (req, res, next) {
    try {
      const { _json } = req.user as Profile;

      const user: Partial<User> = {
        firstName: _json.given_name,
        lastName: _json.family_name,
        avatar: _json.picture,
        email: _json.email,
        username: _json.name,
      };

      /**
       * ! this type of google login api is only for testing
       * ! purpose because it provider and password is fixed
       *
       *
       * TODO: login by google or facebook have to be fixed later
       */
      if (AppConfigEnv.ENV === 'development') {
        const googleLogin: {
          type: 'google' | 'facebook';
          provider_pass: string;
        } = { type: 'google', provider_pass: 'Google@123' };
        req.body = user;
        const existUser = (await userService.findUsers(user)).data.data;

        if (!existUser || !existUser[0]) {
          return await authController.signUp(req, res, next, googleLogin);
        }

        return await authController.signIn(req, res, next, googleLogin);
      }

      // Successful authentication, redirect success.
    } catch (error) {
      Logger.error(error);
      return ApiResponse(res, new InternalServerErrorResponse());
    }
  }
);
OAuhtRoute.get('/error', (req, res) => res.send('error logging in'));

export default OAuhtRoute;
