export class HttpErrorResponse extends Error {
  statusCode: number;
  constructor(message: string = "Bad request", statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class HttpSuccessResponse {
  statusCode: number;
  message: string;
  constructor(message: string = "OK", statusCode: number = 200) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
