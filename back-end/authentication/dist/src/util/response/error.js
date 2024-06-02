"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Unauthorized = exports.MissingParameter = exports.HttpErrorResponse = void 0;
class HttpErrorResponse extends Error {
    constructor(message = "Error", statuCode = 400) {
        super();
        this.message = message;
        this.statuCode = statuCode;
    }
}
exports.HttpErrorResponse = HttpErrorResponse;
class MissingParameter extends HttpErrorResponse {
    constructor(message = "Missing parameter") {
        super(message, 400);
    }
}
exports.MissingParameter = MissingParameter;
class Unauthorized extends HttpErrorResponse {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends HttpErrorResponse {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
