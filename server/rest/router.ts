// [method /api/]: controller[filename][method]
module.exports = (controller: any) => ({
    'post /api/register': controller.user.register,
    'post /api/login': controller.user.login,
})