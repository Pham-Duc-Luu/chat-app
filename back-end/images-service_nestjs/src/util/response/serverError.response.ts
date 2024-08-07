import { ServerErrorResponse } from "./http.response";

// Class representing a 500 Internal Server Error response
export class InternalServerErrorResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Internal Server Error", 500, data);
  }
}

// Class representing a 501 Not Implemented response
export class NotImplementedResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Not Implemented", 501, data);
  }
}

// Class representing a 502 Bad Gateway response
export class BadGatewayResponse<T = undefined> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Bad Gateway", 502, data);
  }
}

// Class representing a 503 Service Unavailable response
export class ServiceUnavailableResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Service Unavailable", 503, data);
  }
}

// Class representing a 504 Gateway Timeout response
export class GatewayTimeoutResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Gateway Timeout", 504, data);
  }
}

// Class representing a 505 HTTP Version Not Supported response
export class HTTPVersionNotSupportedResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("HTTP Version Not Supported", 505, data);
  }
}

// Class representing a 506 Variant Also Negotiates response
export class VariantAlsoNegotiatesResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Variant Also Negotiates", 506, data);
  }
}

// Class representing a 507 Insufficient Storage response
export class InsufficientStorageResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Insufficient Storage", 507, data);
  }
}

// Class representing a 508 Loop Detected response
export class LoopDetectedResponse<
  T = undefined
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Loop Detected", 508, data);
  }
}

// Class representing a 510 Not Extended response
export class NotExtendedResponse<T = undefined> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Not Extended", 510, data);
  }
}

// Class representing a 511 Network Authentication Required response
export class NetworkAuthenticationRequiredResponse<
  T
> extends ServerErrorResponse<T> {
  // Constructor that initializes the status code and message specific to this response type
  constructor(data?: T) {
    super("Network Authentication Required", 511, data);
  }
}
