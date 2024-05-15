import { HttpErrorResponse } from "./http.response";

export class BadRequest extends HttpErrorResponse {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class Unauthorized extends HttpErrorResponse {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class Forbidden extends HttpErrorResponse {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export class NotFound extends HttpErrorResponse {
  constructor(message: string = "Not found") {
    super(message, 404);
  }
}

export class MissingParameter extends BadRequest {
  constructor(message: string = "Missing parameter") {
    super(message);
  }
}
export { HttpErrorResponse };
