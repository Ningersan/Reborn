import * as Koa from 'koa'

class Service {
    ctx: Koa.Context
    app: Koa

    constructor(ctx: Koa.Context, app: Koa) {
        this.ctx = ctx
        this.app = app
    }

    getConfig() {
        return (<any>this.app)['config']
    }

    async currentUser() {
        const username = this.currentUserName()
        const user = await this.ctx.model.user.findOne({
            username,
        })

        if (user) return user
        return null
    }

    currentUserName() {
        return this.ctx.state.user
    }
}

export default Service
