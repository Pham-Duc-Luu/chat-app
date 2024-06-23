"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImUsedResponse = exports.AlreadyReportedResponse = exports.MultiStatusResponse = exports.PartialContentResponse = exports.ResetContentResponse = exports.NoContentResponse = exports.NonAuthoritativeInformationResponse = exports.AcceptedResponse = exports.CreatedResponse = exports.OkResponse = void 0;
const http_response_1 = require("./http.response");
class OkResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("OK", 200, data);
    }
}
exports.OkResponse = OkResponse;
class CreatedResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Created", 201, data);
    }
}
exports.CreatedResponse = CreatedResponse;
class AcceptedResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Accepted", 202, data);
    }
}
exports.AcceptedResponse = AcceptedResponse;
class NonAuthoritativeInformationResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Non-Authoritative Information", 203, data);
    }
}
exports.NonAuthoritativeInformationResponse = NonAuthoritativeInformationResponse;
class NoContentResponse extends http_response_1.SuccessResponse {
    constructor() {
        super("No Content", 204, undefined);
    }
}
exports.NoContentResponse = NoContentResponse;
class ResetContentResponse extends http_response_1.SuccessResponse {
    constructor() {
        super("Reset Content", 205, undefined);
    }
}
exports.ResetContentResponse = ResetContentResponse;
class PartialContentResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Partial Content", 206, data);
    }
}
exports.PartialContentResponse = PartialContentResponse;
class MultiStatusResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Multi-Status", 207, data);
    }
}
exports.MultiStatusResponse = MultiStatusResponse;
class AlreadyReportedResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("Already Reported", 208, data);
    }
}
exports.AlreadyReportedResponse = AlreadyReportedResponse;
class ImUsedResponse extends http_response_1.SuccessResponse {
    constructor(data) {
        super("IM Used", 226, data);
    }
}
exports.ImUsedResponse = ImUsedResponse;
