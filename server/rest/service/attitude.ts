import * as Koa from 'koa'
import Service from './base'

class Attitude extends Service {
    async addStar(id: string) {
        await this.ctx.model.user.update(
            { username: this.currentUserName() },
            { $push: { star: id } }
        )
    }

    async removeStar(id: string) {
        await this.ctx.model.user.update(
            { username: this.currentUserName() },
            { $pull: { star: id } }
        )
    }

    async countStar(username: string, inc: number) {
        await this.ctx.model.user.update(
            { username },
            { $inc: { starCount: inc } }
        )
    }

    async addStared(id: string) {
        const { favorite } = this.ctx.request.body
        await this.ctx.model.user.update(
            { username: favorite },
            { $push: { stared: id } }
        )
    }

    async removeStared(id: string) {
        let { favorite } = this.ctx.request.body
        await this.ctx.model.user.update(
            { username: favorite },
            { $pull: { stared: id } }
        )
    }

    async countStared(username: string, inc: number) {
        await this.ctx.model.user.update(
            { username },
            { $inc: { staredCount: inc } }
        )
    }

    async starList() {
        const users = await this.ctx.model.user
            .find({ username: this.currentUserName() })
            .populate('star')
        return users[0].star
    }

    async staredList() {
        const users = await this.ctx.model.user
            .find({ username: this.currentUserName() })
            .populate('stared')
        return users
    }
}

module.exports = Attitude
