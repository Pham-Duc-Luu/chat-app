"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateService {
    constructor() {
        this.validateEmail = (email) => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(email);
        };
        this.validatePassword = (password) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/;
            return passwordRegex.test(password);
        };
    }
    validateExpired(timeAt, expireAt = 60 // in seconds
    ) {
        const valueDate = new Date(Number(timeAt));
        const expireDate = new Date(valueDate);
        expireDate.setSeconds(expireDate.getSeconds() + expireAt);
        return new Date() > expireDate;
    }
}
const validateService = new ValidateService();
exports.default = validateService;
