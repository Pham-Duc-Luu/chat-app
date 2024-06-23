"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getID = exports.createUser = void 0;
const userdb_1 = require("../database/userdb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const clientError_response_1 = require("../util/response/clientError.response");
async function createUser(username, password, email) {
    // * Check if email exist
    if (await (0, userdb_1.CheckUniqueEmail)(email)) {
        try {
            const saltRounds = Number(process.env.SALTROUND) || 10;
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            return await (0, userdb_1.createUserDB)(email, username, hashedPassword);
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw new clientError_response_1.BadRequest("Error creating user");
        }
    }
    else {
        throw new clientError_response_1.BadRequest("Email already exists");
    }
}
exports.createUser = createUser;
async function getID(email) {
    try {
        const id = await (0, userdb_1.getUserID)(email);
        if (!id) {
            throw new clientError_response_1.BadRequest("Email don't exsits");
        }
        return id;
    }
    catch (error) {
        console.log(error);
        throw new clientError_response_1.BadRequest("Internal ");
    }
}
exports.getID = getID;
