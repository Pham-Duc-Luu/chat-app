export class HttpErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class HttpSuccessResponse {
  statusCode: number;
  message: string;
  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
