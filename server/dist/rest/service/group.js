"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Group extends base_1.default {
    async findOne() {
        const { username } = this.ctx.params;
        const user = await this.ctx.model.user.findOne({ username });
        if (user)
            return user;
        return null;
    }
    // 计算用户浏览量
    async counter(user) {
        const { username, visit } = user;
        this.ctx.service.user.update(username, {
            visit: visit + 1,
        });
    }
    /**
     * 精确查询
     * @param conditions 查询条件
     * @return 返回满足条件的用户列表
     */
    async filter(conditions) {
        const { query } = this.ctx.request;
        const pageSize = parseInt(query.pageSize);
        const page = parseInt(query.page);
        const config = this.getConfig();
        const users = await this.ctx.model.user
            .find(conditions, config.app.userListInfo)
            .limit(pageSize)
            .skip(page * pageSize)
            .sort(config.app.sortRule);
    }
    /**
     * 模糊查询
     * @param conditions 查询条件
     * @return 返回满足条件的用户列表
     */
    async search(conditions) {
        const { query } = this.ctx.request;
        const pageSize = parseInt(query.pageSize);
        const page = parseInt(query.page);
        const config = this.getConfig();
        const reg = new RegExp(Object.values(conditions)[0], 'i');
        const queryCondition = [];
        config.search.words.forEach((element) => {
            queryCondition.push({
                [element]: reg,
            });
        });
        const users = await this.ctx.model.user
            .find({ $or: queryCondition }, config.app.userListInfo)
            .limit(pageSize)
            .skip(page * pageSize)
            .sort(config.app.sortRule);
        if (users)
            return users;
        return null;
    }
}
module.exports = Group;
