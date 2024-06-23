"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorResponse = exports.SuccessResponse = exports.RedirectResponse = exports.ClientErrorResponse = exports.InformationResponse = exports.HttpResponse = void 0;
class HttpResponse {
}
exports.HttpResponse = HttpResponse;
class InformationResponse extends HttpResponse {
    constructor(message, statusCode, data) {
        super();
        message = message;
        statusCode = statusCode;
        data = data;
    }
}
exports.InformationResponse = InformationResponse;
class ClientErrorResponse extends HttpResponse {
    constructor(message, statusCode, data) {
        super();
        message = message;
        statusCode = statusCode;
        data = data;
    }
}
exports.ClientErrorResponse = ClientErrorResponse;
class RedirectResponse extends HttpResponse {
    constructor(message, statusCode, data) {
        super();
        message = message;
        statusCode = statusCode;
        data = data;
    }
}
exports.RedirectResponse = RedirectResponse;
class SuccessResponse extends HttpResponse {
    constructor(message, statusCode, data) {
        super();
        message = message;
        statusCode = statusCode;
        data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
class ServerErrorResponse extends HttpResponse {
    constructor(message, statusCode, data) {
        super();
        message = message;
        statusCode = statusCode;
        data = data;
    }
}
exports.ServerErrorResponse = ServerErrorResponse;
const clientRes = __importStar(require("./clientError.response"));
const informationRes = __importStar(require("./information.response"));
const redirectRes = __importStar(require("./redirect.response"));
const serverErrRes = __importStar(require("./serverError.response"));
const successfulRes = __importStar(require("./successful.response"));
exports.default = {
    clientRes,
    informationRes,
    redirectRes,
    serverErrRes,
    successfulRes,
};
