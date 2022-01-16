/**
 * @description:用户信息路由
 */

// 导入路由模块
const express = require('express')
const router = express.Router()
// 导入用户信息路由处理函数
const { getUserHandler, updateUserHandler, updatePwdHandler, updateAvatarHandler } = require('../router_handler/user.js')
// 导入请求体数据表单验证中间件和用户信息表单验证规则
const expressJoi = require('@escook/express-joi')
const { updateUserSchema, updatePwdSchema, updateAvatarSchema } = require('../schema/user')

//获取用户基本信息
router.get('/userinfo', getUserHandler)
//更新用户基本信息,需要通过表单验证中间件的验证才能执行路由处理函数
router.post('/userinfo', expressJoi(updateUserSchema), updateUserHandler)
//用户密码重置
router.post('/updatepwd', expressJoi(updatePwdSchema), updatePwdHandler)
// 用户头像更换
router.post('/update/avatar', expressJoi(updateAvatarSchema), updateAvatarHandler)

// 导出路由模块
module.exports = router