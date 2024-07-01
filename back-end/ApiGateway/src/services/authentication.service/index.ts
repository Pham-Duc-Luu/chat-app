import { SuccessResponse } from '../../util/response/http.response';
import authServiceApi from './authentication.service.init';
import { ICreateToken, IToken } from './type';

export class AuthService {
  /**
   * Creates a JWT token using the provided data.
   *
   * @remarks
   * This method sends a POST request to the "/generate-jwt-token" endpoint of the authentication service API.
   * The response is expected to contain a JSON object representing the generated JWT token.
   *
   * @param data - The data required to create the JWT token.
   * @returns A promise that resolves to the generated JWT token.
   *
   * @throws Will throw an error if the request fails or if the response does not contain a valid JWT token.
   */

  createToken(data: ICreateToken) {
    return authServiceApi.post<SuccessResponse<IToken>>(
      '/generate-jwt-token',
      data
    );
  }
}

const authService = new AuthService();
export default authService;
