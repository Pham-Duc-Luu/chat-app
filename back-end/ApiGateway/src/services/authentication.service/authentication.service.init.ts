import axios, { AxiosInstance } from 'axios';
import AppConfigEnv from '../../config/app.config';

export class AuthServiceApiConfig {
  private baseURL: string = AppConfigEnv.BASE_URL_AUTHENTICATION_SERVICE;
  private api_key: string = AppConfigEnv.API_KEY_AUTHETICATION_SERVICE;
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

const authServiceApi = new AuthServiceApiConfig().getApi();

export default authServiceApi;
