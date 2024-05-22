import Logger from "../lib/logger";

class ValidateService {
    validateEmail = (email: string): boolean => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(email);
    };
    validatePassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$/;

        return passwordRegex.test(password);
    };
    validateExpired(
        timeAt: string,
        expireAt: number = 60 // in seconds
    ): boolean {
        const valueDate = new Date(Number(timeAt));
        const expireDate = new Date(valueDate);

        expireDate.setSeconds(expireDate.getSeconds() + expireAt);

        return new Date() > expireDate;
    }
}

const validateService = new ValidateService();
export default validateService;
