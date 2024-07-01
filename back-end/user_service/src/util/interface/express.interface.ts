import { Response } from 'express';
import { Express } from 'express-serve-static-core';
import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';
import { number } from 'zod';
import { HttpResponse } from '../response/http.response';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQueryBody<T extends Query>
  extends Express.Request {}

export interface TypedRequest<T extends Query = any, U = any>
  extends Express.Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody = HttpResponse> extends Response {
  json: Send<ResBody, this>;
  status: (statusCode: number) => this;
}
