import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

import Express, { Request, Response } from 'express';

export class HttpResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

export class InformationResponse<T> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ClientErrorResponse<T = any> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class RedirectResponse<T = any> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
export class SuccessResponse<T = any> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ServerErrorResponse<T = any> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

import * as clientRes from './clientError.response';
import * as informationRes from './information.response';
import * as redirectRes from './redirect.response';

import * as serverErrRes from './serverError.response';

import * as successfulRes from './successful.response';

export default {
  clientRes,
  informationRes,
  redirectRes,
  serverErrRes,
  successfulRes,
};
