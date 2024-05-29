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
  /**
   * Creates a new access and refresh token pair.
   *
   * @param email - The email of the user
   * @param id - The id of the user
   * @returns An object containing the access token and refresh token
   */
  async createToken(email: string, id: number) {
    // Define the payload with the user's email and id
    const payload = { email, id };

    // Create the access token with payload, secret, and expiration time
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });

    // Create the refresh token with the payload, secret, and expiration time
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
    });

    // Return the access token and refresh token
    return { accessToken, refreshToken };
  }
}

const tokenService = new TokenService();
export default tokenService;
