"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(ctx, app) {
        this.ctx = ctx;
        this.app = app;
    }
    getConfig() {
        return this.app['config'];
    }
    emit(code, message, payload) {
        this.ctx.body = {
            code,
            message,
            payload,
        };
    }
    async currentUser() {
        const username = this.currentUserName();
        const user = await this.ctx.model.user.findOne({
            username
        });
        if (user)
            return user;
        return null;
    }
    currentUserName() {
        return this.ctx.state.user;
    }
}
exports.default = Controller;
