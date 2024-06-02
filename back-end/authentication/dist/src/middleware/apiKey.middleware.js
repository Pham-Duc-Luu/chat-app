"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../config/app.config"));
const error_1 = require("../util/response/error");
/**
 * Middleware to check for a valid API key in the request headers.
 *
 * This middleware function checks if the request contains a valid API key in the headers.
 * If the API key is missing or invalid, it throws an appropriate error.
 * If the API key is valid, it passes control to the next middleware or route handler.
 */
function userApiKeyMiddleware(req, res, next) {
    var _a;
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            throw new error_1.Unauthorized("Unauthorized");
        }
        if (apiKey !== ((_a = app_config_1.default.app.apiKey) === null || _a === void 0 ? void 0 : _a.userService)) {
            throw new error_1.Forbidden("No Permission");
        }
        next();
    }
    catch (error) {
        const err = new error_1.HttpErrorResponse(error.message, error.statuCode);
        return res.status(err.statuCode).json(err.message);
    }
}
exports.default = userApiKeyMiddleware;
;
