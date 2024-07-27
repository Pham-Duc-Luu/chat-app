import { Request, Response } from 'express';
import { Express, Params, ParamsDictionary } from 'express-serve-static-core';
import { Send } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';
import { number } from 'zod';
import { HttpResponse } from '../response/http.response';

export interface TypedRequestBody<T> extends Request {
  body: Partial<T>;
}

export interface TypedRequestQueryBody<T extends Query> extends Request {
  query: Partial<T>;
}

export interface TypedRequestParams<T extends ParamsDictionary>
  extends Request {
  params: T;
}
export interface TypedRequest<
  T extends Query = any,
  U = any,
  P = ParamsDictionary
> extends Request {
  body: U;
  query: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
