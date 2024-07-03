import { Response, Request } from 'express';
import { Express } from 'express-serve-static-core';
import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

export interface TypedRequestBody<T> extends Request {
  body: Partial<T>;
}

export interface TypedRequestQueryBody<T extends Query> extends Request {}

export interface TypedRequest<T extends Query = any, U = any> extends Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
