"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const app_config_1 = __importDefault(require("../config/app.config"));
const router_interface_1 = require("../util/interface/router.interface");
const user_route_1 = __importDefault(require("./user/user.route"));
class AppRouter extends router_interface_1.IRouter {
    constructor(baseUrl = app_config_1.default.app.baseUrl) {
        super();
        this.setAuthRouter = () => {
            this._router.use(user_route_1.default.router);
        };
        this.baseUrl = baseUrl;
        this._router = (0, express_1.Router)();
        this.setAuthRouter();
    }
}
exports.AppRouter = AppRouter;
const appRouter = new AppRouter();
exports.default = appRouter;
