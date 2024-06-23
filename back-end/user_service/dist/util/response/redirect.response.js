"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermanentRedirectResponse = exports.TemporaryRedirectResponse = exports.UseProxyResponse = exports.NotModifiedResponse = exports.SeeOtherResponse = exports.FoundResponse = exports.MovedPermanentlyResponse = exports.MultipleChoicesResponse = void 0;
const http_response_1 = require("./http.response");
class MultipleChoicesResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Multiple Choices", 300, data);
    }
}
exports.MultipleChoicesResponse = MultipleChoicesResponse;
class MovedPermanentlyResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Moved Permanently", 301, data);
    }
}
exports.MovedPermanentlyResponse = MovedPermanentlyResponse;
class FoundResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Found", 302, data);
    }
}
exports.FoundResponse = FoundResponse;
class SeeOtherResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("See Other", 303, data);
    }
}
exports.SeeOtherResponse = SeeOtherResponse;
class NotModifiedResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Not Modified", 304, data);
    }
}
exports.NotModifiedResponse = NotModifiedResponse;
class UseProxyResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Use Proxy", 305, data);
    }
}
exports.UseProxyResponse = UseProxyResponse;
class TemporaryRedirectResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Temporary Redirect", 307, data);
    }
}
exports.TemporaryRedirectResponse = TemporaryRedirectResponse;
class PermanentRedirectResponse extends http_response_1.RedirectResponse {
    constructor(data) {
        super("Permanent Redirect", 308, data);
    }
}
exports.PermanentRedirectResponse = PermanentRedirectResponse;
