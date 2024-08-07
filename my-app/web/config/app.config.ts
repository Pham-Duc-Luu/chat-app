import util from '@/util';
import _ from 'lodash';

/**
 * the environment must be specified
 * development or production
 */

type environmentType = 'production' | 'development';

/**
 *  TODO : add environment variables here
 */

const ENVVARIABLE = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXT_PUBLIC_BACKEND_URL',
  'NEXT_PUBLIC_GATEWAY_KEY',
  'NEXT_PUBLIC_BACKEND_BASE_URL',
  'NEXT_PUBLIC_ENV',
  'NEXT_PUBLIC_PUBLIC_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
] as const;

export type Tenv = (typeof ENVVARIABLE)[number];

const AppConfigEnv = util.getEnvVariables(Array.from(ENVVARIABLE));

/**
 * type of environment variables
 */
if (
  AppConfigEnv.NEXT_PUBLIC_ENV !== 'production' &&
  AppConfigEnv.NEXT_PUBLIC_ENV !== 'development'
) {
  throw new Error('environment must be production or development');
}

export default AppConfigEnv;
