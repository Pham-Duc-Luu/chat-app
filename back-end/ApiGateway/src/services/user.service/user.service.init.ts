import axios, { AxiosInstance } from 'axios';
import AppConfigEnv from '../../config/app.config';

export class UserServiceApiConfig {
  private baseURL: string = AppConfigEnv.BASE_URL_USER_SERVICE;
  private api_key: string = AppConfigEnv.API_KEY_USER_SERVICE;
  private timeout: number = 5000;
  private api: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    timeout: this.timeout,
    headers: {
      'Content-Type ': 'application/x-www-form-urlencoded',
      'x-api-key': this.api_key,
    },
  });

  public getApi(): AxiosInstance {
    return this.api;
  }
}

const userServiceApi = new UserServiceApiConfig().getApi();

export default userServiceApi;
