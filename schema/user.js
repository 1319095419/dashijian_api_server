/**
 * @description:用户信息路由表单验证
 */

// 导入joi定义表单验证规则
const joi = require('joi')

// 用户id验证规则
const id = joi.number().integer().min(1).required()
// 昵称验证规则
const nickname = joi.string().required()
//邮箱验证规则
const email = joi.string().email().required()
// 密码验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
//头像验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

// 导出用户信息更新表单验证
exports.updateUserSchema = {
    body: {
        id,
        nickname,
        email
    }
}
// 导出密码重置表单验证
exports.updatePwdSchema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 导出头像更换表单验证
exports.updateAvatarSchema = {
    body: {
        avatar
    }
}