import { config } from 'dotenv';
import _ from 'lodash';
import util from '../util/function';
import Logger from '../lib/logger';
config();

/**
 * the environment must be specified
 * development or production
 */

type environmentType = 'production' | 'development';

/**
 *  TODO : add environment variables here
 */

const ENVVARIABLE = [
  'APP_BASE_URL',
  'ENV',
  'APP_PORT',
  'API_KEY_USER_SERVICE',
  'BASE_URL_USER_SERVICE',
  'API_KEY_AUTHETICATION_SERVICE',
  'BASE_URL_AUTHENTICATION_SERVICE',
  'SERVER_KEY',
  'NGROK_AUTHTOKEN',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'TESTING_IP',
] as const;

export type Tenv = (typeof ENVVARIABLE)[number];

const AppConfigEnv = util.getEnvVariables(Array.from(ENVVARIABLE));

/**
 * type of environment variables
 */
if (AppConfigEnv.ENV !== 'production' && AppConfigEnv.ENV !== 'development') {
  throw new Error('environment must be production or development');
}

if (AppConfigEnv.ENV === 'development') {
  Logger.info(AppConfigEnv);
}
export default AppConfigEnv;
