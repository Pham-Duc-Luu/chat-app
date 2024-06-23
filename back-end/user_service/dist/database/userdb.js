"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDB = exports.getUserID = exports.CheckUniqueEmail = void 0;
const connect_postgresql_1 = require("./postgresql/connect.postgresql");
// * Find user in DB by email return true with no record
async function CheckUniqueEmail(email) {
    const user = await connect_postgresql_1.prisma.user.findFirst({
        where: { email },
    });
    console.log(user);
    if (user) {
        return false;
    }
    return true;
}
exports.CheckUniqueEmail = CheckUniqueEmail;
// * Get user by ID
async function getUserID(email) {
    const user = await connect_postgresql_1.prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        return null;
    }
    return user.id;
}
exports.getUserID = getUserID;
// * Create a new record
async function createUserDB(email, username, password) {
    const user = await connect_postgresql_1.prisma.user.create({
        data: {
            email,
            username,
            password,
        },
    });
    return user.id;
}
exports.createUserDB = createUserDB;
