import _ from "lodash";
import Logger from "../../lib/logger";

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

  keys<T extends object>(obj: Record<keyof T, any>): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }

  getEnvVariables<T extends X, X extends string>(arr: X[]): Record<T, string> {
    for (let i = 0; i < arr.length; i++) {
      if (!process.env[arr[i]]) {
        Logger.error(`Mising environment variable \n please add ${arr[i]}  `);
        process.exit(1);
      }
    }

    return _.pick(process.env, arr) as Record<T, string>;
  }
}

const util = new Util();
export default util;
