"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Util {
    pickerOptions(obj, options) {
        if (options.length === 0) {
            return obj;
        }
        return lodash_1.default.pick(obj, options);
    }
}
const util = new Util();
exports.default = util;
