/**
 * @description:入口文件
 * @author:赵文东
 */

// 引入express框架
const express = require('express')
// 引入cors跨域资源共享
const cors = require('cors')

// 创建app实列，开启服务器
const app = express()

// 配置cors中间件
app.use(cors())
// 配置请求体数据解析中间件，解析application/x-www-form-urlencoded类型的数据
app.use(express.urlencoded({extended:false}))


//开启服务器
app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})
