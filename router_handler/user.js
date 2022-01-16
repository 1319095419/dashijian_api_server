/**
 * @description:用户信息路由处理函数
 */

// 导入数据库连接对象
const db = require('../db/index')
// 导入密码加密模块
const bcrypt = require('bcryptjs')

// 获取用户信息处理函数
exports.getUserHandler = (req, res) => {
    // token解析成功后会将解析后的用户数据存入req.user中
    const id = req.user.id //获取到登录用户对应的id
    // 根据id在数据库中查找用户数据
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    db.query(sql, id, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length !== 1) return res.sendError('获取用户信息失败')
        // 获取用户信息成功，向客户端返回用户数据
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })

}
// 更新用户信息处理函数
exports.updateUserHandler = (req, res) => {
    // 在数据库中更新用户数据
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.sendError(err) // sql语句执行失败
        console.log(results.affectedRows);
        if (results.affectedRows !== 1) return res.sendError('修改用户信息失败')
        //更新用户信息成功
        res.send({
            status: 0,
            message: '修改用户信息成功'
        })
    })
}
// 密码重置处理函数
exports.updatePwdHandler = (req, res) => {
    //获取到登录用户在数据库中的数据
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length !== 1) return res.sendError('用户信息不存在')
        // 获取登录用户信息成功,判断用户输入的旧密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.sendError('旧密码输入错误')
        // 旧密码输入正确，修改数据库中的密码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.sendError(err) //sql语句执行失败
            if (results.affectedRows !== 1) return res.sendError('密码重置失败')
            // 密码重置成功
            res.send({
                status: 0,
                message: '密码重置成功'
            })
        })
    })

}
// 头像更换处理函数
exports.updateAvatarHandler = (req, res) => {
    // 将base64图片存到数据库中
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.sendError(err) // sql语句执行失败
        if(results.affectedRows!==1) return res.sendError('头像更换失败')
        res.send({
            status:0,
            message:'头像更换成功'
        })
    })
}