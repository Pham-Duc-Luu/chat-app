import { InformationResponse } from "./http.response";

export class ContinueResponse<T> extends InformationResponse<T> {
  constructor(data?: T) {
    super("Continue", 100, data);
  }
}

export class SwitchingProtocolsResponse<T> extends InformationResponse<T> {
  constructor(data?: T) {
    super("Switching Protocols", 101, data);
  }
}

export class ProcessingResponse<T> extends InformationResponse<T> {
  constructor(data?: T) {
    super("Processing", 102, data);
  }
}

export class EarlyHintsResponse<T> extends InformationResponse<T> {
  constructor(data?: T) {
    super("Early Hints", 103, data);
  }
}
