import _ from "lodash";

class Util {
    pickerOptions<T>(obj: T, options: (keyof T)[]): Partial<T> {
        if (options.length === 0) {
            return obj;
        }
        return _.pick(obj, options);
    }
}

const util = new Util();
export default util;
