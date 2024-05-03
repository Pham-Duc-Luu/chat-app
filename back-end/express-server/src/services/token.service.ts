import tokenSchema from '../models/token.model';

class TokenService {
  async createToken(email: string, id: string) {
    const existingToken = await tokenSchema.findOne({ email: email });

    if (!existingToken) {
      throw new Error();
    }

    return 'ok';
  }
}

const tokenService = new TokenService();
export default tokenService;
