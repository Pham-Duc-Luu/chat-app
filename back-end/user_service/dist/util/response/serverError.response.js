"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkAuthenticationRequiredResponse = exports.NotExtendedResponse = exports.LoopDetectedResponse = exports.InsufficientStorageResponse = exports.VariantAlsoNegotiatesResponse = exports.HTTPVersionNotSupportedResponse = exports.GatewayTimeoutResponse = exports.ServiceUnavailableResponse = exports.BadGatewayResponse = exports.NotImplementedResponse = exports.InternalServerErrorResponse = void 0;
const http_response_1 = require("./http.response");
// Class representing a 500 Internal Server Error response
class InternalServerErrorResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Internal Server Error", 500, data);
    }
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
// Class representing a 501 Not Implemented response
class NotImplementedResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Not Implemented", 501, data);
    }
}
exports.NotImplementedResponse = NotImplementedResponse;
// Class representing a 502 Bad Gateway response
class BadGatewayResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Bad Gateway", 502, data);
    }
}
exports.BadGatewayResponse = BadGatewayResponse;
// Class representing a 503 Service Unavailable response
class ServiceUnavailableResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Service Unavailable", 503, data);
    }
}
exports.ServiceUnavailableResponse = ServiceUnavailableResponse;
// Class representing a 504 Gateway Timeout response
class GatewayTimeoutResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Gateway Timeout", 504, data);
    }
}
exports.GatewayTimeoutResponse = GatewayTimeoutResponse;
// Class representing a 505 HTTP Version Not Supported response
class HTTPVersionNotSupportedResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("HTTP Version Not Supported", 505, data);
    }
}
exports.HTTPVersionNotSupportedResponse = HTTPVersionNotSupportedResponse;
// Class representing a 506 Variant Also Negotiates response
class VariantAlsoNegotiatesResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Variant Also Negotiates", 506, data);
    }
}
exports.VariantAlsoNegotiatesResponse = VariantAlsoNegotiatesResponse;
// Class representing a 507 Insufficient Storage response
class InsufficientStorageResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Insufficient Storage", 507, data);
    }
}
exports.InsufficientStorageResponse = InsufficientStorageResponse;
// Class representing a 508 Loop Detected response
class LoopDetectedResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Loop Detected", 508, data);
    }
}
exports.LoopDetectedResponse = LoopDetectedResponse;
// Class representing a 510 Not Extended response
class NotExtendedResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Not Extended", 510, data);
    }
}
exports.NotExtendedResponse = NotExtendedResponse;
// Class representing a 511 Network Authentication Required response
class NetworkAuthenticationRequiredResponse extends http_response_1.ServerErrorResponse {
    // Constructor that initializes the status code and message specific to this response type
    constructor(data) {
        super("Network Authentication Required", 511, data);
    }
}
exports.NetworkAuthenticationRequiredResponse = NetworkAuthenticationRequiredResponse;
