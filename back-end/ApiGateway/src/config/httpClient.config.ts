import axios, { AxiosInstance } from "axios";
import app_config from "./server.config";
app_config;
const createHttpClient = (
  baseURL: string,
  x_api_key: string
): AxiosInstance => {
  return axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": x_api_key,
    },
  });
};

const authenticationApi = createHttpClient(
  app_config.services.Authentication.base_url,
  app_config.services.Authentication.api_key
);
const userApi = createHttpClient(
  app_config.services.UserService.base_url,
  app_config.services.UserService.api_key
);

export { authenticationApi, userApi };
export default createHttpClient;
