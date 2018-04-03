'use strict'
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                        ? (desc = Object.getOwnPropertyDescriptor(target, key))
                        : desc,
            d
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function(k, v) {
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.metadata === 'function'
        )
            return Reflect.metadata(k, v)
    }
Object.defineProperty(exports, '__esModule', { value: true })
const base_1 = require('./base')
const blueprint_1 = require('../blueprint')
const _1 = require('../middlewares/')
const code_1 = require('../../constants/code')
class User extends base_1.default {
    getConfig() {
        return this.app['config']
    }
    async register() {
        const { username } = this.ctx.request.body
        try {
            const isUserExist = await this.ctx.service.user.find(username)
            if (isUserExist) {
                return this.emit(
                    code_1.default.USER_IS_EXIST,
                    code_1.default.USER_IS_EXIST_MSG
                )
            }
            await this.ctx.service.user.create()
            this.emit(
                code_1.default.USER_REGISTER_SUCCESS,
                code_1.default.USER_REGISTER_SUCCESS_MSG,
                {
                    user: username,
                    token: _1.Auth.signToken(username),
                }
            )
        } catch (error) {
            this.ctx.throw(code_1.default.SERVER_ERROR)
        }
    }
    async login() {
        const { service } = this.ctx
        const { username, email, password } = this.ctx.request.body
        try {
            const user = await service.user.find(username)
            if (!user) {
                return this.emit(
                    code_1.default.USER_IS_NOT_EXIST,
                    code_1.default.USER_IS_NOT_EXIST_MSG
                )
            }
            const isCorrect = await service.user.checkPassword(
                password,
                user.password
            )
            if (!isCorrect) {
                return this.emit(
                    code_1.default.USER_PASSWORD_ERROR,
                    code_1.default.USER_PASSWORD_ERROR_MSG
                )
            }
            this.ctx.status = 200
            this.emit(
                code_1.default.USER_LOGIN_SUCCESS,
                code_1.default.USER_LOGIN_SUCCESS_MSG,
                {
                    token: _1.Auth.signToken(username),
                }
            )
        } catch (error) {
            this.ctx.throw(code_1.default.SERVER_ERROR)
        }
    }
    async logout() {
        console.log(this.ctx.state)
    }
    /**
     * after update, set isUpdated true
     */
    async updateMe() {
        const { service } = this.ctx
        const current = this.currentUserName()
        const info = this.ctx.request.body
        try {
            const hasUpdated = await service.user.update(
                current,
                Object.assign({}, info, { isUpdated: true })
            )
            if (!hasUpdated) {
                return this.emit(
                    code_1.default.USER_UPDATE_ERROR,
                    code_1.default.USER_UPDATE_ERROR_MSG
                )
            }
            this.emit(
                code_1.default.USER_UPDATE_SUCCESS,
                code_1.default.USER_UPDATE_SUCCESS_MSG
            )
        } catch (error) {
            this.ctx.throw(code_1.default.SERVER_ERROR)
        }
    }
    // 上传图片
    async uploadImage() {
        const { service } = this.ctx
        const current = this.currentUserName()
    }
}
__decorate(
    [
        blueprint_1.default.post('/api/register'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    User.prototype,
    'register',
    null
)
__decorate(
    [
        blueprint_1.default.post('/api/login'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    User.prototype,
    'login',
    null
)
__decorate(
    [
        blueprint_1.default.post('/api/logout'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    User.prototype,
    'logout',
    null
)
__decorate(
    [
        blueprint_1.default.put('/api/update/me'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    User.prototype,
    'updateMe',
    null
)
__decorate(
    [
        blueprint_1.default.post('/api/uploadImage'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', Promise),
    ],
    User.prototype,
    'uploadImage',
    null
)
exports.default = User
//# sourceMappingURL=user.js.map
