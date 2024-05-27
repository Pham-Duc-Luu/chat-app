import { HttpErrorResponse } from "./http.response";

export class TooManyRerquest extends HttpErrorResponse {
  constructor(message: string = "Too many request", statusCode: number = 429) {
    super(message, statusCode);
  }
}
