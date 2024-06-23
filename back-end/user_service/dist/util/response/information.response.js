"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyHintsResponse = exports.ProcessingResponse = exports.SwitchingProtocolsResponse = exports.ContinueResponse = void 0;
const http_response_1 = require("./http.response");
class ContinueResponse extends http_response_1.InformationResponse {
    constructor(data) {
        super("Continue", 100, data);
    }
}
exports.ContinueResponse = ContinueResponse;
class SwitchingProtocolsResponse extends http_response_1.InformationResponse {
    constructor(data) {
        super("Switching Protocols", 101, data);
    }
}
exports.SwitchingProtocolsResponse = SwitchingProtocolsResponse;
class ProcessingResponse extends http_response_1.InformationResponse {
    constructor(data) {
        super("Processing", 102, data);
    }
}
exports.ProcessingResponse = ProcessingResponse;
class EarlyHintsResponse extends http_response_1.InformationResponse {
    constructor(data) {
        super("Early Hints", 103, data);
    }
}
exports.EarlyHintsResponse = EarlyHintsResponse;
