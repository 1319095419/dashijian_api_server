/**
 * @description:用户登录和注册表单验证
 */

// 导入表单验证模块
const joi = require('joi')

//用户名验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 导出用户注册表单验证模块
exports.reguserSchema = {
    body: {
        username,
        password
    },
}

// 到处用户登录表单验证模块
exports.loginSchema = {
    body: {
        username,
        password
    }
}