"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../service/user.service");
const valid_service_1 = __importDefault(require("../service/valid.service"));
const clientError_response_1 = require("../util/response/clientError.response");
const successful_response_1 = require("../util/response/successful.response");
class Controller {
    constructor() {
        this.createUserService = async (req, res) => {
            try {
                const { username, password, email } = req.body;
                // * Missing parameter
                if (!username || !password || !email) {
                    throw new clientError_response_1.BadRequestResponse("Missing Username or Password or Email");
                }
                // * check form of email and password and username return true if correct form
                if (valid_service_1.default.isValidEmail(email) &&
                    valid_service_1.default.isValidPassword(password) &&
                    valid_service_1.default.isValidUserName(username)) {
                    const b = await (0, user_service_1.createUser)(username, password, email);
                    res.status(200).json({
                        message: "User created successfully.",
                        id: b,
                    });
                }
                else {
                    throw new clientError_response_1.BadRequestResponse("Email or password or username is not valid");
                }
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ message: error.message });
            }
        };
        this.getUserID = async (req, res) => {
            try {
                const { email } = req.body;
                if (!email) {
                    throw new clientError_response_1.BadRequestResponse("Missing email");
                }
                if (valid_service_1.default.isValidEmail(email)) {
                    const id = await (0, user_service_1.getID)(email);
                    res.json(new successful_response_1.OkResponse({ id }));
                }
            }
            catch (error) {
                console.log(error);
                res.json(new clientError_response_1.BadRequestResponse());
            }
        };
    }
}
const userController = new Controller();
exports.default = userController;
