/**
 * @description:入口文件
 * @author:赵文东
 */

// 引入express框架
const express = require('express')
// 引入cors跨域资源共享
const cors = require('cors')
// 引入表单验证中间件
const joi = require('joi')

// 创建app实列，开启服务器
const app = express()

//将路由中返回的错误封装为一个函数并挂载到req中
app.use((req, res, next) => {
    res.sendError = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 配置cors中间件
app.use(cors())
// 配置请求体数据解析中间件，解析application/x-www-form-urlencoded类型的数据
app.use(express.urlencoded({ extended: false }))

// 引入并配置express-jwt中间件，解析token为json对象
const expressJWT = require('express-jwt')
const { secretKeyJwt } = require('./option')
app.use(expressJWT({ secret: secretKeyJwt, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 引入并配置用户注册和登录路由
const loginAndReguserRouter = require('./router/loginAndReguser')
app.use('/api', loginAndReguserRouter)
// 引入并配置用户信息路由
const userRouter = require('./router/user')
app.use('/my', userRouter)
// 引入并配置文章分类路由
const artcateRouter = require('./router/artcate')
app.use('/my/article', artcateRouter)

//配置错误中间件捕获错误
app.use((err, req, res, next) => {
    // 表单验证失败
    if (err instanceof joi.ValidationError) return res.sendError(err)
    // 捕获身份认证失败的错误(token无效或不存在)
    if (err.name === 'UnauthorizedError') return res.sendError('身份认证失败')
    //未知错误
    res.sendError(err)
})

//开启服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})
