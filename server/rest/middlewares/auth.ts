import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'

const config = require('../../config/config.default')

class Auth {
    static signToken(username: string) {
        return jsonwebtoken.sign(
            username,
            config.token.secret
        )
    }

    static verifyToken() {
        return jwt({
            secret: config.token.secret,
        }).unless({ path: config.auth.excludes })
    }

    static errorHandle(ctx: Koa.Context, next: any) {
        return next().catch((err: any) => {
            if (err.status === 401) {
                ctx.status = 401
                ctx.body = {
                    error: err.originalError
                        ? err.originalError.message
                        : err.message,
                }
            } else {
                throw err
            }
        })
    }
}

export default Auth
