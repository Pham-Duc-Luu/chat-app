import { Response } from 'express';
import { HttpResponse } from '../response/http.response';

export const ApiResponse = (res: Response, data: HttpResponse) => {
  return res.status(data.statusCode).json(data);
};
