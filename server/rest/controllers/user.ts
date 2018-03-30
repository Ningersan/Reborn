import * as Koa from 'koa'
import * as bcrypt from 'bcrypt'
import * as jsonwebtoken from 'jsonwebtoken'
import Controller from './base'
import bp from '../blueprint'
import { Auth } from '../middlewares/'
import code from '../../constants/code'

class User extends Controller {
    getConfig() {
        return (<any>this.app)['config']
    }

    @bp.post('/api/register')
    async register() {
        const { username} = this.ctx.request.body

        try {
            const isUserExist = await this.ctx.service.user.find(username)

            if (isUserExist) {
                return this.emit(code.USER_IS_EXIST, code.USER_IS_EXIST_MSG)
            }

            await this.ctx.service.user.create()
            this.emit(
                code.USER_REGISTER_SUCCESS,
                code.USER_REGISTER_SUCCESS_MSG,
                {
                    user: username,
                    token: Auth.signToken(username),
                }
            )
        } catch (error) {
            this.ctx.throw(code.SERVER_ERROR)
        }
    }

    @bp.post('/api/login')
    async login() {
        const { service } = this.ctx
        const { username, email, password } = this.ctx.request.body

        try {
            const user = await service.user.find(username)
            if (!user) {
                return this.emit(
                    code.USER_IS_NOT_EXIST,
                    code.USER_IS_NOT_EXIST_MSG
                )
            }

            const isCorrect = await service.user.checkPassword(
                password,
                user.password
            )
            if (!isCorrect) {
                return this.emit(
                    code.USER_PASSWORD_ERROR,
                    code.USER_PASSWORD_ERROR_MSG
                )
            }

            this.ctx.status = 200
            this.emit(code.USER_LOGIN_SUCCESS, code.USER_LOGIN_SUCCESS_MSG, {
                token: Auth.signToken(username),
            })
        } catch (error) {
            this.ctx.throw(code.SERVER_ERROR)
        }
    }

    @bp.post('/api/logout')
    async logout() {
        console.log(this.ctx.state)
    }

    /**
     * after update, set isUpdated true
     */
    @bp.put('/api/update/me')
    async updateMe() {
        const { service } = this.ctx
        const info = this.ctx.request.body

        try {
            const hasUpdated = await service.user.update(this.currentUser(), {
                ...info,
                isUpdated: true,
            })
            if (!hasUpdated) {
                return this.emit(
                    code.USER_UPDATE_ERROR,
                    code.USER_UPDATE_ERROR_MSG
                )
            }
            this.emit(code.USER_UPDATE_SUCCESS, code.USER_UPDATE_SUCCESS_MSG)
        } catch (error) {
            this.ctx.throw(code.SERVER_ERROR)
        }
    }

    // 删除用户
    // async deluser(ctx: Koa.Context) {
    //     // await ……
    // }

    // 重置密码
    // async resetpwd(ctx: Koa.Context) {
    //     // await ……
    // }
}

export default User
