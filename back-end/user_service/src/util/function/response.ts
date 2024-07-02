import { HttpResponse } from '../response/http.response';
import { TypedResponse } from '../interface/express.interface';
import { Response } from 'express';

export function ApiResponse<T, U = Response>(
  res: Response,
  data: T
): TypedResponse<T> {
  if (data instanceof HttpResponse) {
    return res.status(data.statusCode).json(data);
  }
  return res.status(200).json(data);
}
