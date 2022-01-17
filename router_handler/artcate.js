/**
 * @description:文章分类路由处理函数
 */

// 导入数据库连接对象
const db = require('../db/index')

// 获取文章分类
exports.getArtcateHandler = (req, res) => {
    const sql = 'select * from ev_artcates where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results
        })
    })
}

// 新增文章分类
exports.addCatesHandler = (req, res) => {
    // 判断文章分类名称和别名在数据库中是否已经被占用
    const sql = 'select * from ev_artcates where is_delete=? and (name=? or alias=?)'
    db.query(sql, [0, req.body.name, req.body.alias], (err, results) => {
        console.log(results);
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length === 2) return res.sendError('文章名称和别名均已被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.sendError('文章名称和别名均已被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.sendError('文章名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.sendError('文章别名被占用')
        //文章名称和别名可以使用，将文章分类数据添加到数据库中
        const sql = 'insert into ev_artcates set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.sendError(err) //sql语句执行失败
            if (results.affectedRows !== 1) return res.sendError('新增文章分类失败')
            res.send({
                status: 0,
                message: '新增文章分类成功'
            })
        })
    })
}

// 根据id删除文章分类
exports.delCatesByIdHandler = (req, res) => {
    //根据id删除数据库中文章分类数据
    const sql = 'update ev_artcates set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.affectedRows !== 1) return res.sendError('删除文章分类失败')
        res.send({
            status: 0,
            message: '删除文章分类成功'
        })
    })
}

// 根据id获取文章分类
exports.getCateByIdHandler = (req, res) => {
    //根据id获取数据库中文章分类数据
    const sql = 'select * from ev_artcates where Id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length !== 1) return res.sendError('获取文章分类失败')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}

// 根据id更新文章数据
exports.updateCateByIdHandler = (req, res) => {
    // 判断文章分类名称和别名在数据库中是否已经被占用
    const sql = 'select * from ev_artcates where Id!=? and is_delete=? and (name=? or alias=?)'
    db.query(sql, [req.body.Id, 0, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length === 2) return res.sendError('文章名称和别名均已被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.sendError('文章名称和别名均已被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.sendError('文章名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.sendError('文章别名被占用')
        //文章名称和别名可以使用，更新数据库中的文章分类数据
        const sql = 'update ev_artcates set ? where Id=?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.sendError(err) //sql语句执行失败
            if (results.affectedRows !== 1) return res.sendError('更新文章分类失败')
            res.send({
                status: 0,
                message: '新增文章分类成功'
            })
        })
    })
}