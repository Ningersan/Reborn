"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const dev_1 = require("../../config/dev");
const user_1 = require("../controllers/user");
const router = new Router();
router.prefix(`/${dev_1.default.baseApi}`);
router.post('/register', user_1.default.register);
router.post('/login', user_1.default.login);
router.post('/logout', user_1.default.logout);
exports.default = router;
//# sourceMappingURL=user.js.map