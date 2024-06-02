import axios from "axios";
import app_config from "../../config/server.config";

const userServiceApi = axios.create({
  baseURL: app_config.services.UserService.base_url,
  timeout: 1000,
  headers: {
    "x-api-key": app_config.services.UserService.api_key,
  },
});
