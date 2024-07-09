import { URLSearchParams } from 'url';
import {
  ClientErrorResponse,
  HttpResponse,
  SuccessResponse,
} from '../../util/response/http.response';
import { User } from './type';
import userServiceApi from './user.service.init';
interface IReqLogin {
  email: string;
  id: number;
}

interface IUserBaseInfo {
  username: string;
  password: string;
  email: string;
}

class UserService {
  /**
   * Creates a new user token.
   *
   * @remarks
   * This method sends a POST request to the server to create a new user token.
   * The server expects the request body to contain the user's base information.
   *
   * @param data - The user's base information, including username, password, and email.
   * @returns - A promise that resolves to an HttpResponse or a SuccessResponse with the user's base information.
   *
   * @example
   * ```typescript
   * const userBaseInfo: IUserBaseInfo = {
   *   username: "johnDoe",
   *   password: "password123",
   *   email: "johndoe@example.com",
   * };
   *
   */
  createUser(data: Partial<User>) {
    return userServiceApi.post<
      SuccessResponse<Pick<User, 'id' | 'email' | 'username' | 'avatar'>>
    >('/users/create-new-user', data);
  }
  findUsers(data: Partial<Pick<User, 'email' | 'username'>>) {
    return userServiceApi.get<
      SuccessResponse<Pick<User, 'id' | 'email' | 'username' | 'avatar'>[] | []>
    >('/users/find-users?' + new URLSearchParams(data).toString());
  }

  verifyAccout(data: Pick<User, 'email' | 'password'>) {
    return userServiceApi.get<
      SuccessResponse<Pick<User, 'id' | 'email' | 'username' | 'avatar'>>
    >('/verify-account', { data: data });
  }
}

const userService = new UserService();

export default userService;
