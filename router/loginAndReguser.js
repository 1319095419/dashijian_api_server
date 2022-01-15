/**
 * @description用户注册和登录路由
 */
// 创建express路由模块
const express = require('express')
const router = express.Router()

// 导入验证表单数据的中间件和注册登录表单验证模块
const expressJoi = require('@escook/express-joi')
const { reguserSchema, loginSchema } = require('../schema/loginAndReguser')
// 导入用户注册和登录路由处理函数
const { reguserHandler, loginHandler } = require('../router_handler/loginAndReguser')

// 在注册和登录新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
// 用户注册路由
router.post('/reguser', expressJoi(reguserSchema), reguserHandler)
// 用户登录路由
router.post('/login', expressJoi(loginSchema), loginHandler)

// 导出路由模块
module.exports = router