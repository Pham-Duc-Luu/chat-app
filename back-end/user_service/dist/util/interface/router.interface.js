"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRouter = void 0;
const express_1 = require("express");
class IRouter {
    constructor() {
        this.baseUrl = "";
        this._router = (0, express_1.Router)();
        this.router = () => {
            return this._router;
        };
    }
    setUse(...args) {
        return this._router.use(...args);
    }
    setPost(args) {
        return this._router.post(...args);
    }
    setGet(...args) {
        return this._router.get(...args);
    }
    setPut(...args) {
        return this._router.put(...args);
    }
    setPatch(...args) {
        return this._router.patch(...args);
    }
    setDelete(...args) {
        return this._router.delete(...args);
    }
    setOptions(...args) {
        return this._router.options(...args);
    }
}
exports.IRouter = IRouter;
