import _ from "lodash";

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
}

const util = new Util();
export default util;
