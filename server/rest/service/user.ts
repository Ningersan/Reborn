import * as Koa from 'koa'
import * as bcrypt from 'bcrypt'
import Service from './base'

class User extends Service {
    async find(username: string, infoList?: Array<string>) {
        const user = await this.ctx.model.user.findOne({ username }, infoList)

        if (user) return user
        // return null
    }

    async checkPassword(password1: any, password2: any) {
        const isCorrect = await bcrypt.compare(password1, password2)
        return isCorrect
    }

    async create() {
        const { username, email, password } = this.ctx.request.body
        const enhancePassword = await bcrypt.hash(password, 5)

        this.ctx.model.user.create({
            username,
            email,
            password: enhancePassword,
        })
    }

    async update(username: string, info: object) {
        return await this.ctx.model.user.update(
            { username },
            info,
            (error: any, docs: object) => {
                return error ? false : true
            }
        )
    }
}

// notice that you should use medule.esports instead of export default
module.exports = User
