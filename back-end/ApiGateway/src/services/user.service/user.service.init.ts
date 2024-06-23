import axios, { AxiosInstance } from "axios";
import app_config from "../../config/server.config";

const userServiceApi = axios.create({
  baseURL: app_config.services.UserService.base_url,
  timeout: 1000,
  headers: {
    "x-api-key": app_config.services.UserService.api_key,
  },
});

class UserService {
  private baseURL: string = app_config.services.UserService.base_url;
  private api_key: string = app_config.services.UserService.api_key;
  private timeout: number = 5000;
  private api: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    timeout: this.timeout,
  });
}
