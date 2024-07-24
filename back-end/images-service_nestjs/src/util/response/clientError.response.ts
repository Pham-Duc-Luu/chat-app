import { ClientErrorResponse } from './http.response';

export class BadRequestResponse<T = any> extends ClientErrorResponse<T> {
  constructor(message: string, data?: T);
  constructor(data?: T);

  constructor(messageOrData?: string | T | any, data?: T) {
    if (typeof messageOrData === 'string') {
      super(messageOrData, 400, data);
    } else {
      super('Bad Request', 400, data);
    }
  }
}

export class UnauthorizedResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Unauthorized', 401, data);
  }
}

export class PaymentRequiredResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Payment Required', 402, data);
  }
}

export class ForbiddenResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Forbidden', 403, data);
  }
}

export class NotFoundResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Not Found', 404, data);
  }
}

export class MethodNotAllowedResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Method Not Allowed', 405, data);
  }
}

export class NotAcceptableResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Not Acceptable', 406, data);
  }
}

export class ProxyAuthenticationRequiredResponse<
  T
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Proxy Authentication Required', 407, data);
  }
}

export class RequestTimeoutResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Request Timeout', 408, data);
  }
}

export class ConflictResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Conflict', 409, data);
  }
}

export class GoneResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Gone', 410, data);
  }
}

export class LengthRequiredResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Length Required', 411, data);
  }
}

export class PreconditionFailedResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Precondition Failed', 412, data);
  }
}

export class PayloadTooLargeResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Payload Too Large', 413, data);
  }
}

export class URITooLongResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('URI Too Long', 414, data);
  }
}

export class UnsupportedMediaTypeResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Unsupported Media Type', 415, data);
  }
}

export class RangeNotSatisfiableResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Range Not Satisfiable', 416, data);
  }
}

export class ExpectationFailedResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Expectation Failed', 417, data);
  }
}

export class ImATeapotResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super("I'm a teapot", 418, data);
  }
}

export class MisdirectedRequestResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Misdirected Request', 421, data);
  }
}

export class UnprocessableContentResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Unprocessable Content', 422, data);
  }
}

export class LockedResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Locked', 423, data);
  }
}

export class FailedDependencyResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Failed Dependency', 424, data);
  }
}

export class TooEarlyResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Too Early', 425, data);
  }
}

export class UpgradeRequiredResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Upgrade Required', 426, data);
  }
}

export class PreconditionRequiredResponse<
  T = any
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Precondition Required', 428, data);
  }
}

export class TooManyRequestsResponse<T = any> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Too Many Requests', 429, data);
  }
}

export class RequestHeaderFieldsTooLargeResponse<
  T
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Request Header Fields Too Large', 431, data);
  }
}

export class UnavailableForLegalReasonsResponse<
  T
> extends ClientErrorResponse<T> {
  constructor(data?: T) {
    super('Unavailable For Legal Reasons', 451, data);
  }
}

// Example usage:
const badRequestResponse = new BadRequestResponse({ error: 'Invalid input' });
const notFoundResponse = new NotFoundResponse({ error: 'Resource not found' });
