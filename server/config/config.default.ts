module.exports = {
    baseApi: 'api',
    auth: {
        excludes: [/\/api\/register/, /\/api\/login/],
    },
    token: {
        secret: 'xfiles-reborn',
        exp: 2592000000,
    },
    app: {
        // 用户列表返回的字段名称
        userListInfo: ['username', 'isUpdated'],
        sortRule: {
            createdAt: 1,
        },
    },
    search: {
        // 模糊查询时支持的字段
        words: ['username'],
    },
}
