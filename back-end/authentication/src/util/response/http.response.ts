import { Send } from "express-serve-static-core";
import { Query } from "express-serve-static-core";

import Express, { Request, Response } from "express";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQueryBody<T extends Query>
  extends Express.Request {
  query: T;
}

export interface TypedRequest<T extends Query = any, U = any>
  extends Express.Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export class HttpResponse<T = undefined> {
  statusCode: number = 0;
  message: string = "";
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

export class ClientErrorResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class RedirectResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
export class SuccessResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ServerErrorResponse<T = undefined> extends HttpResponse<T> {
  constructor(message: string, statusCode: number, data?: T) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
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
