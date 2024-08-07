import * as _ from 'lodash';
import Logger from '../../lib/logger';
import { config } from 'dotenv';

config();

class Util {
  pickerOptions<T>(obj: T, options: (keyof T)[]): Partial<T> {
    if (options.length === 0) {
      return obj;
    }
    return _.pick(obj, options);
  }

  pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  }
  getEnvVariables<T extends X, X extends string>(arr: X[]): Record<T, string> {
    for (let i = 0; i < arr.length; i++) {
      if (!process.env[arr[i]]) {
        Logger.error(`Mising environment variable \n please add ${arr[i]}  `);
        throw new Error(`${arr[i]} is undefined`);
      }
    }

    return _.pick(process.env, arr) as Record<T, string>;
  }

  findUndefinedProperties<T>(obj: Partial<T>): (keyof T)[] {
    const undefinedProperties: (keyof T)[] = [];

    for (const key in obj) {
      if (obj[key] === undefined) {
        undefinedProperties.push(key);
      }
    }

    return undefinedProperties;
  }
}

const util = new Util();
export default util;
