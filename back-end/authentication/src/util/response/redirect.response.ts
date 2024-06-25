import { RedirectResponse } from "./http.response";

export class MultipleChoicesResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Multiple Choices", 300, data);
  }
}

export class MovedPermanentlyResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Moved Permanently", 301, data);
  }
}

export class FoundResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Found", 302, data);
  }
}

export class SeeOtherResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("See Other", 303, data);
  }
}

export class NotModifiedResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Not Modified", 304, data);
  }
}

export class UseProxyResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Use Proxy", 305, data);
  }
}

export class TemporaryRedirectResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Temporary Redirect", 307, data);
  }
}

export class PermanentRedirectResponse<T> extends RedirectResponse<T> {
  constructor(data?: T) {
    super("Permanent Redirect", 308, data);
  }
}
