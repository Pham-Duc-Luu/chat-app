import { config } from 'dotenv';
import util from '../util/function';
import Logger from '../lib/logger';
config();

/**
 * the environment must be specified
 * development or production
 */

/**
 *  TODO : add environment variables here
 */

const ENVVARIABLE = [
  'APP_BASE_URL',
  'ENV',
  'APP_PORT',
  'SERVER_KEY',
  'POSTGRES_URL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
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
