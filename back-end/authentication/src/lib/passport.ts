import passport, { Profile } from "passport";
import jwt from "jsonwebtoken";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authService from "../services/auth.service";
import tokenService from "../service/token";
/**
 * This is middleware when use google 
 */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        /**
         * 
         * @param accessToken 
         * @param refreshToken 
         * @param profile : email, name, image
         * @param done 
         * 
         * return access token and refreshtoken
         */
        async function (
            accessToken: string, // defaut
            refreshToken: string,// defaut
            profile: Profile,
            done: any
        ) {
            const email = profile.emails?.shift()?.value;
            try {
                if (email) {
                    const user = await authService.authGoogle(
                        email,
                    );

                    const payload = {
                        _id: user._id,
                        email: user.email,
                    };

                    // * accesstoken la dang ma hoa cua { id, email } can co khoa

                    const accessToken = jwt.sign(
                        payload,
                        process.env.ACCESS_TOKEN_SECRET || "",
                        { expiresIn: process.env.EXPIRES_TOKEN_TIME }
                    );

                    const refreshToken = jwt.sign(
                        payload,
                        process.env.REFRESH_TOKEN_SECRET || ""
                    );

                    await tokenService.createToken(refreshToken, user._id);
                    console.log(accessToken, refreshToken);

                    done(null, {
                        accessToken,
                        refreshToken,
                    });
                }
            } catch (error) {
                console.log(error);

                done(null, profile);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;
