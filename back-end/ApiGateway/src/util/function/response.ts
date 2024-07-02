import { Response } from 'express';
import { HttpResponse } from '../response/http.response';
import { TypedResponse } from '../interface/express.interface';

export function ApiResponse<T>(res: Response, data: T): TypedResponse<T> {
  if (data instanceof HttpResponse) {
    return res.status(data.statusCode).json(data);
  }
  return res.status(200).json(data);
}
