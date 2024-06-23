"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilService {
    randomDigital(length) {
        let result = "";
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
const utilService = new UtilService();
exports.default = utilService;
