import _ from "lodash";

interface My {
  i: string;
}
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

  getEnvVariables(arr: string[]): Record<string, string | undefined> {
    return arr.reduce(
      (
        total: Record<string, string | undefined>,
        currentValue,
        currentIndex
      ) => {
        // Assuming that each element in the array is a key-value pair separated by a colon

        total[currentValue] = process.env[currentValue];
        return total;
      },
      {}
    );
  }
  checkEnvironments<T>(obj: T) {}
}

const util = new Util();
export default util;
