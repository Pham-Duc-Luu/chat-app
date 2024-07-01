import { Response } from 'express-serve-static-core';
import { HttpResponse } from '../response/http.response';

export const ApiResponse = (res: Response, data: HttpResponse): Response => {
  return res.status(data.statusCode).json(data);
};
