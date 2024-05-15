import { HttpSuccessResponse } from "./http.response";

export class Created extends HttpSuccessResponse {
  constructor(message: string = "Created") {
    super(message, 201);
  }
}
