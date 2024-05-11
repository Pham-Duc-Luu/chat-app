export class HttpErrorResponse extends Error {
    statuCode: number;
    constructor(message: string = "Error", statuCode: number = 400) {
        super();
        this.message = message;
        this.statuCode = statuCode;
    }
}

export class MissingParameter extends HttpErrorResponse {
    constructor(message: string = "Missing parameter") {
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
