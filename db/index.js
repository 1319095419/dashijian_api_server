/**
 * @description：连接数据库
 */

// 导入mysql模块
const mysql = require('mysql')

// 连接数据库
const db = mysql.createPool({
    host:'127.0.0.1', //数据库IP地址
    user:'root', //用户名
    password:'admin123', //密码
    database:'my_db_01' //要连接的数据库名称
})
// 测试数据库是否连接成功
// db.query('select 1',function(err,result){
//     if(err) return console.log(err.message);
//     console.log(result); //打印结果为RowDataPacket { '1': 1 }说明数据库连接成功
// })

// 向外共享db数据库连接对象
module.exports = db