import { SuccessResponse } from "./http.response";

export class OkResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("OK", 200, data);
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Created", 201, data);
  }
}

export class AcceptedResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Accepted", 202, data);
  }
}

export class NonAuthoritativeInformationResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Non-Authoritative Information", 203, data);
  }
}

export class NoContentResponse<T> extends SuccessResponse<T> {
  constructor() {
    super("No Content", 204, undefined);
  }
}

export class ResetContentResponse<T> extends SuccessResponse<T> {
  constructor() {
    super("Reset Content", 205, undefined);
  }
}

export class PartialContentResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Partial Content", 206, data);
  }
}

export class MultiStatusResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Multi-Status", 207, data);
  }
}

export class AlreadyReportedResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("Already Reported", 208, data);
  }
}

export class ImUsedResponse<T> extends SuccessResponse<T> {
  constructor(data: T) {
    super("IM Used", 226, data);
  }
}
