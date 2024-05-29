import { isValid } from "zod";

class Valid {
  // * is it a correct email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // * Have UpperCase, LoweCase, Special Char, min length is 8, Checks for at least one digit.
  isValidPassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return false;
    }

    if (!hasUpperCase.test(password)) {
      return false;
    }

    if (!hasLowerCase.test(password)) {
      return false;
    }

    if (!hasDigit.test(password)) {
      return false;
    }
    
    if (!hasSpecialChar.test(password)) {
      return false;
    }

    return true;
  }
  // * username correct has at least 8 character
  isValidUserName(username: string): boolean {
    const minLength = 8;
    if (username.length < minLength) {
      return false;
    }
    return true;
  }
}
const valid = new Valid();
export default valid;
