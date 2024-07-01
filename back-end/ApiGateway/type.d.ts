declare global {
  namespace Express {
    interface Request {
      email: string;
      password: string;
      user?: JwtPayload;
    }
  }
}
