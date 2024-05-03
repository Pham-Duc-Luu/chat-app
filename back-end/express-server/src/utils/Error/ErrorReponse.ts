export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
}

export class BadRequest extends ErrorResponse {
  constructor(message: string = 'Bad request', statusCode: number = 400) {
    // viet loi vao mot file log nao do

    super(message, statusCode);
  }
}

export class Unauthorized extends ErrorResponse {
  constructor(message: string = 'Unauthorized', statusCode: number = 401) {
    super(message, statusCode);
  }
}
