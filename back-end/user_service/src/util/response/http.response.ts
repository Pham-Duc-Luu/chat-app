export class HttpResponse<T = undefined> {
  statusCode: Number;
  message: string;
  data?: T;
}

export class InformationResponse<T> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    message = message;
    statusCode = statusCode;
    data = data;
  }
}

export class ClientErrorResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    message = message;
    statusCode = statusCode;
    data = data;
  }
}

export class RedirectResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    message = message;
    statusCode = statusCode;
    data = data;
  }
}
export class SuccessResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    message = message;
    statusCode = statusCode;
    data = data;
  }
}

export class ServerErrorResponse<T> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    message = message;
    statusCode = statusCode;
    data = data;
  }
}

import * as clientRes from "./clientError.response";
import * as informationRes from "./information.response";
import * as redirectRes from "./redirect.response";

import * as serverErrRes from "./serverError.response";

import * as successfulRes from "./successful.response";

export default {
  clientRes,
  informationRes,
  redirectRes,
  serverErrRes,
  successfulRes,
};
