import { Express } from 'express-serve-static-core';
import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

export interface TypedRequestBody<T> extends Express.Request {
  body: Partial<T>;
}

export interface TypedRequestQueryBody<T extends Query>
  extends Express.Request {}

export interface TypedRequest<T extends Query = any, U = any>
  extends Express.Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
