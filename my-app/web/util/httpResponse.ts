export class HttpResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  constructor(message: string, statusCode: number, data?: T) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
