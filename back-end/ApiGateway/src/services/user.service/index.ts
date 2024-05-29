import { userApi, authenticationApi } from "../../config/httpClient.config";
interface IReqLogin {
  email: string;
  id: number
}
class UserService {
  async get_id(email: string): Promise<number> {
    try {
      const res = await userApi.post<{ id: number }>("/users/get-id", {
        email,
      });
      return res.data.id;
    } catch (error) {  
      throw error;
    }
  }
  async genToken(data:IReqLogin) {
    const res = await authenticationApi.post<{ accessToken: string }>(
      "/generate-token",
      data
    );
    return res.data;
  }
}

const userService = new UserService();
export default userService;
