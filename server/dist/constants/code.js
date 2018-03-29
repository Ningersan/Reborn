"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    // register
    USER_REGISTER_SUCCESS: 10011,
    USER_REGISTER_SUCCESS_MSG: '注册成功',
    USER_IS_EXIST: 10012,
    USER_IS_EXIST_MSG: '该用户已存在，请使用密码登录',
    // login
    USER_LOGIN_SUCCESS: 10021,
    USER_LOGIN_SUCCESS_MSG: '登录成功',
    USER_IS_NOT_EXIST: 10022,
    USER_IS_NOT_EXIST_MSG: '用户不存在，请先注册',
    USER_PASSWORD_ERROR: 10023,
    USER_PASSWORD_ERROR_MSG: '密码错误，请检查',
    // UPDate
    USER_UPDATE_SUCCESS: 10031,
    USER_UPDATE_SUCCESS_MSG: '更新成功',
    USER_UPDATE_ERROR: 10032,
    USER_UPDATE_ERROR_MSG: '更新信息失败',
    // get user info
    USER_GET_INFO_SUCCESS: 10041,
    USER_GET_INFO_SUCCESS_MSG: '成功找到用户',
    USER_GET_INFO_ERROR: 10042,
    USER_GET_INFO_ERROR_MSG: '找不到该用户的信息',
    USER_LIST_GET_SUCCESS: 10043,
    USER_LIST_GET_SUCCESS_MSG: '成功返回用户',
    USER_LIST_GET_ERROR: 10044,
    USER_LIST_GET_ERROR_MSG: '竟然一个用户都没有',
};