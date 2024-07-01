import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import AppConfigEnv from '../../config/app.config';
import { Router } from 'express';
import authController from '../../controller/auth.controller';
import { User } from '../../services/user.service/type';

const OAuhtRoute = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: AppConfigEnv.GOOGLE_CLIENT_ID,
      clientSecret: AppConfigEnv.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://localhost:5000/apigateway/api/v1/auth/google/callback',
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

OAuhtRoute.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

OAuhtRoute.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    const { _json } = req.user as Profile;
    let user: Partial<User> = {
      email: _json.email,
      username: _json.name,
      firstName: _json.family_name,
      lastName: _json.given_name,
      avatar: _json.picture,
    };
    return res.send(_json);
    // Successful authentication, redirect success.
  }
);
OAuhtRoute.get('/error', (req, res) => res.send('error logging in'));

export default OAuhtRoute;
