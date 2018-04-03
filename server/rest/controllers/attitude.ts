import * as Koa from 'koa'
import bp from '../blueprint'
import Controller from './base'

class Attitude extends Controller {
    @bp.post('/api/attitude/star/create')
    async star() {
        const { favorite } = this.ctx.request.body
        if (!favorite) {
            return this.emit(404, '请携带参数')
        }

        try {
            const current = await this.currentUser()
            const target = await this.ctx.service.user.find(favorite)
            const currentId = current._id
            const targetId = target._id

            await this.ctx.service.attitude.addStar(targetId)
            await this.ctx.service.attitude.countStar(current.username, 1)
            await this.ctx.service.attitude.addStared(currentId)
            await this.ctx.service.attitude.countStared(target.username, 1)
        } catch (error) {
            this.emit(400, '点赞失败')
            this.ctx.throw(500)
        }
    }

    @bp.post('/api/attitude/star/destroy')
    async unStar() {
        const { favorite } = this.ctx.request.body
        if (!favorite) {
            return this.emit(404, '请携带参数')
        }

        try {
            const current = await this.currentUser()
            const target = await this.ctx.service.user.find(favorite)
            const currentId = current._id
            const targetId = target._id

            await this.ctx.service.attitude.removeStar(targetId)
            await this.ctx.service.attitude.countStar(current.username, -1)
            await this.ctx.service.attitude.removeStared(currentId)
            await this.ctx.service.attitude.countStared(target.username, -1)
        } catch (error) {
            this.emit(400, '取消点赞失败')
            this.ctx.throw(500)
        }
    }

    @bp.get('/api/attitude/star/list')
    async getStarList() {
        try {
            const users = await this.ctx.service.attitude.starList()
            if (!users || users.length === 0) {
                return this.emit(400, '还没有点赞过的人')
            }
            this.emit(200, '获取点赞列表成功', users)
        } catch (error) {
            this.ctx.throw(500)
        }
    }

    @bp.get('/api/attitude/stared/list')
    async getStaredList() {
        try {
            const users = await this.ctx.service.attitude.staredList()
            if (!users) {
                return this.emit(400, '还没有被别人点赞过呢QWQ')
            }
            this.emit(200, '获取点赞列表成功', users)
        } catch (error) {
            this.ctx.throw(500)
        }
    }
}

export default Attitude
