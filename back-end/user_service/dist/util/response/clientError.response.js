"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnavailableForLegalReasonsResponse = exports.RequestHeaderFieldsTooLargeResponse = exports.TooManyRequestsResponse = exports.PreconditionRequiredResponse = exports.UpgradeRequiredResponse = exports.TooEarlyResponse = exports.FailedDependencyResponse = exports.LockedResponse = exports.UnprocessableContentResponse = exports.MisdirectedRequestResponse = exports.ImATeapotResponse = exports.ExpectationFailedResponse = exports.RangeNotSatisfiableResponse = exports.UnsupportedMediaTypeResponse = exports.URITooLongResponse = exports.PayloadTooLargeResponse = exports.PreconditionFailedResponse = exports.LengthRequiredResponse = exports.GoneResponse = exports.ConflictResponse = exports.RequestTimeoutResponse = exports.ProxyAuthenticationRequiredResponse = exports.NotAcceptableResponse = exports.MethodNotAllowedResponse = exports.NotFoundResponse = exports.ForbiddenResponse = exports.PaymentRequiredResponse = exports.UnauthorizedResponse = exports.BadRequestResponse = void 0;
const http_response_1 = require("./http.response");
class BadRequestResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Bad Request", 400, data);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class UnauthorizedResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Unauthorized", 401, data);
    }
}
exports.UnauthorizedResponse = UnauthorizedResponse;
class PaymentRequiredResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Payment Required", 402, data);
    }
}
exports.PaymentRequiredResponse = PaymentRequiredResponse;
class ForbiddenResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Forbidden", 403, data);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class NotFoundResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Not Found", 404, data);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class MethodNotAllowedResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Method Not Allowed", 405, data);
    }
}
exports.MethodNotAllowedResponse = MethodNotAllowedResponse;
class NotAcceptableResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Not Acceptable", 406, data);
    }
}
exports.NotAcceptableResponse = NotAcceptableResponse;
class ProxyAuthenticationRequiredResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Proxy Authentication Required", 407, data);
    }
}
exports.ProxyAuthenticationRequiredResponse = ProxyAuthenticationRequiredResponse;
class RequestTimeoutResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Request Timeout", 408, data);
    }
}
exports.RequestTimeoutResponse = RequestTimeoutResponse;
class ConflictResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Conflict", 409, data);
    }
}
exports.ConflictResponse = ConflictResponse;
class GoneResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Gone", 410, data);
    }
}
exports.GoneResponse = GoneResponse;
class LengthRequiredResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Length Required", 411, data);
    }
}
exports.LengthRequiredResponse = LengthRequiredResponse;
class PreconditionFailedResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Precondition Failed", 412, data);
    }
}
exports.PreconditionFailedResponse = PreconditionFailedResponse;
class PayloadTooLargeResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Payload Too Large", 413, data);
    }
}
exports.PayloadTooLargeResponse = PayloadTooLargeResponse;
class URITooLongResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("URI Too Long", 414, data);
    }
}
exports.URITooLongResponse = URITooLongResponse;
class UnsupportedMediaTypeResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Unsupported Media Type", 415, data);
    }
}
exports.UnsupportedMediaTypeResponse = UnsupportedMediaTypeResponse;
class RangeNotSatisfiableResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Range Not Satisfiable", 416, data);
    }
}
exports.RangeNotSatisfiableResponse = RangeNotSatisfiableResponse;
class ExpectationFailedResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Expectation Failed", 417, data);
    }
}
exports.ExpectationFailedResponse = ExpectationFailedResponse;
class ImATeapotResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("I'm a teapot", 418, data);
    }
}
exports.ImATeapotResponse = ImATeapotResponse;
class MisdirectedRequestResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Misdirected Request", 421, data);
    }
}
exports.MisdirectedRequestResponse = MisdirectedRequestResponse;
class UnprocessableContentResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Unprocessable Content", 422, data);
    }
}
exports.UnprocessableContentResponse = UnprocessableContentResponse;
class LockedResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Locked", 423, data);
    }
}
exports.LockedResponse = LockedResponse;
class FailedDependencyResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Failed Dependency", 424, data);
    }
}
exports.FailedDependencyResponse = FailedDependencyResponse;
class TooEarlyResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Too Early", 425, data);
    }
}
exports.TooEarlyResponse = TooEarlyResponse;
class UpgradeRequiredResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Upgrade Required", 426, data);
    }
}
exports.UpgradeRequiredResponse = UpgradeRequiredResponse;
class PreconditionRequiredResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Precondition Required", 428, data);
    }
}
exports.PreconditionRequiredResponse = PreconditionRequiredResponse;
class TooManyRequestsResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Too Many Requests", 429, data);
    }
}
exports.TooManyRequestsResponse = TooManyRequestsResponse;
class RequestHeaderFieldsTooLargeResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Request Header Fields Too Large", 431, data);
    }
}
exports.RequestHeaderFieldsTooLargeResponse = RequestHeaderFieldsTooLargeResponse;
class UnavailableForLegalReasonsResponse extends http_response_1.ClientErrorResponse {
    constructor(data) {
        super("Unavailable For Legal Reasons", 451, data);
    }
}
exports.UnavailableForLegalReasonsResponse = UnavailableForLegalReasonsResponse;
// Example usage:
const badRequestResponse = new BadRequestResponse({ error: "Invalid input" });
const notFoundResponse = new NotFoundResponse({ error: "Resource not found" });
