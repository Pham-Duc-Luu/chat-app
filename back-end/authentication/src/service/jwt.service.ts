import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

class JwtService {
  /**
   * This class provides methods for generating JWT tokens for user authentication.
   */

  /**
   * Generates access and refresh tokens for a given user.
   *
   * @param existUser - The user object for whom the tokens are being generated.
   * @returns An object containing the generated access and refresh tokens.
   *
   * @remarks
   * The access token is signed with the user's public key and has a short expiration time.
   * The refresh token is signed with the user's private key and has a longer expiration time.
   *
   * @throws Will throw an error if the user's public or private key is not provided.
   */
  async generateTokenFromUser(existUser: User, options?: { avatar: string }) {
    const accessToken = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
        username: existUser.username,
        avatar: options?.avatar,
      },
      existUser.publicKey,
      { expiresIn: existUser.accessTokenExpIn }
    );

    const refreshToken = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
        username: existUser.username,
      },
      existUser.privateKey,
      { expiresIn: existUser.refreshTokenExpIn }
    );
    return { accessToken, refreshToken };
  }
}

const jwtService = new JwtService();

export default jwtService;
