"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../lib/logger"));
const clientError_response_1 = require("../util/response/clientError.response");
function ApiKey(req, res, next) {
    try {
        const api_key = req.headers["x-api-key"];
        const apikey = process.env.API_Key || "api-key";
        if (!api_key) {
            throw new clientError_response_1.BadRequestResponse("Missing x-api-key");
        }
        if (api_key !== apikey) {
            throw new clientError_response_1.UnauthorizedResponse("No Access");
        }
        next();
    }
    catch (error) {
        console.log(error.stack);
        logger_1.default.error(error.stack);
    }
}
exports.default = ApiKey;
