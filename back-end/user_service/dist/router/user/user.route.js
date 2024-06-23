"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const router_interface_1 = require("../../util/interface/router.interface");
class UserRouter extends router_interface_1.IRouter {
    constructor(baseUrl = "/user") {
        super();
        this.baseUrl = baseUrl;
    }
}
exports.UserRouter = UserRouter;
const userRouter = new UserRouter();
exports.default = userRouter;
