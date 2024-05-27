import { config } from "dotenv";

const jwt = require("jsonwebtoken");
class TokenService {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  constructor() {
    this.accessTokenSecret = process.env.ACCESSTOKENSECRET || "khoimm";
    this.refreshTokenSecret = process.env.REFRESHTOKENSECRET || "khoimm0811";
    this.accessTokenExpiry = process.env.ACCESSTOKENEXPIRY || "1m"; 
    this.refreshTokenExpiry = process.env.REFRESHTOKENEXPIRY || "7h"; 
  }

  async createToken(email: string, id: number) {
    const payload = { email, id };

    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
    });

    return { accessToken, refreshToken };
  }
}

const tokenService = new TokenService();
export default tokenService;
