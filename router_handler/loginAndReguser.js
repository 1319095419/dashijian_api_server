/**
 * @description用户注册和登陆路由处理函数
 */
// 导入数据库操作对象
const db = require('../db/index')
// 导入bcryptjs为密码加密
const bcrypt = require('bcryptjs')
// 导入jwt用于生成token字符串
const jwt = require('jsonwebtoken')
//导入token加密的密钥
const { secretKeyJwt } = require('../option')

// 注册路由处理函数
exports.reguserHandler = (req, res) => {
    //获取用户注册数据
    const userInfo = req.body
    // 判断用户名是否已经被注册
    const sql = 'select * from ev_users where username=?' //定义sql语句
    db.query(sql, userInfo.username, (err, results) => {
        if (err) return res.send(err.message) // 判断sql语句是否执行成功
        // 执行成功后判断数据库中是否有相同的用户名
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名已经被注册，请重新输入'
            })
        }
        //对用户输入的密码进行加密，返回的是加密后的字符串
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // 将用户注册信息添加到数据库中
        const sql = 'insert into ev_users set ?' //定义sql语句
        db.query(sql, userInfo, (err, results) => {
            if (err) return res.sendError(err) //判断sql语句是否执行成功
            // 判断插入数据是否成功
            if (results.affectedRows !== 1) return res.sendError('注册失败')
            // 数据插入成功
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })
}
// 登录路由处理函数
exports.loginHandler = (req, res) => {
    // 获取到用户请求体数据
    const userInfo = req.body
    // 判断用户名是否存在
    const sql = 'select * from ev_users where username=?' //sql语句
    db.query(sql, userInfo.username, (err, results) => {
        if (err) return res.sendError(err) //判断sql语句是否执行成功
        // 判断用户名是否存在
        if (results.length < 1) {
            return res.sendError('登陆失败') // 用户名不存在，登陆失败
        }
        // 比较用户输入的密码和数据库中的密码是否相同，返回布尔值
        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if (!compareResult) { //两次密码输入不相同
            return res.sendError('输入密码错误')
        }
        //剔除用户信息中的敏感数据
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }
        // 输入密码正确，返回用户信息对应的token
        const tokenStr = jwt.sign(user, secretKeyJwt, { expiresIn: '8h' }) //生成token字符串
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })

}