"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const token_1 = __importDefault(require("../service/token"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async function (accessToken, refreshToken, profile, done) {
    var _a, _b, _c, _d, _e;
    const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.value;
    const name = (_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName;
    const image = (_e = (_d = profile.photos) === null || _d === void 0 ? void 0 : _d.shift()) === null || _e === void 0 ? void 0 : _e.value;
    try {
        if (email) {
            const user = await auth_service_1.default.authGoogle(email);
            const payload = {
                _id: user._id,
                email: user.email,
            };
            // * accesstoken la dang ma hoa cua { id, email } can co khoa
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: process.env.EXPIRES_TOKEN_TIME });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET || "");
            await token_1.default.createToken(refreshToken, user._id);
            console.log(accessToken, refreshToken);
            done(null, {
                accessToken,
                refreshToken,
            });
        }
    }
    catch (error) {
        console.log(error);
        done(null, profile);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
