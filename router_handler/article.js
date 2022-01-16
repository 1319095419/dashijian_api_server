/**
 * @description: 文章管理路由处理函数
 */
// 导入path模块
const path = require('path')
//导入数据库连接对象
const db = require('../db/index')

// 发布新文章
exports.addArticleHandler = (req, res) => {
    // 拼接好需要添加到数据库中的数据
    const articleData = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename), //封面地址
        pub_date: new Date(),
        author_id: req.user.id
    }
    // 将数据存入数据库中
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleData, (err, results) => {
        if (err) return res.sendError(err) // sql语句执行失败
        if (results.affectedRows !== 1) return res.sendError('文章发布失败')
        res.send({
            status: 0,
            message: '文章发布成功'
        })
    })
}

// 获取文章分类列表
exports.getArticleListHandler = (req, res) => {
    // 获取到客户发送过来的请求头中的数据
    const query = req.query
    // 根据cate_id和state从数据库中查找数据
    let whereStr = 'where is_delete=?'
    let sqlData = [0]
    if (query.cate_id && query.state) {
        whereStr = 'where is_delete=? and cate_id=? and state=?'
        sqlData = [0, query.cate_id, query.state]
    } else if (query.cate_id) {
        whereStr = 'where is_delete=? and cate_id=?'
        sqlData = [0, query.cate_id]
    } else if (query.state) {
        whereStr = 'where is_delete=? and state=?'
        sqlData = [0, query.state]
    }
    const sql = `select Id,title,pub_date,state,cate_id from ev_articles ${whereStr}`
    console.log(sql);
    db.query(sql, sqlData, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        // 获取文章分类列表
        const sql = 'select * from ev_artcates order by id asc'
        db.query(sql, (err, results1) => {
            if (err) return res.sendError(err) //sql语句执行失败
            const dataList = results
            results.map((value, index) => {
                results1.map((value1) => {
                    if (value.cate_id === value1.Id) {
                        value.cate_name = value1.name
                    }
                })
            })
            // 计算最大页码数
            const maxPage = Math.ceil(dataList.length / query.pagesize);
            if (query.pagenum > maxPage) return res.sendError('页码值不能大于' + maxPage)
            // 根据页码值返回对应的数据列表
            const dataShowList = []
            dataList.map((value, index) => {
                if (index >= query.pagesize * (query.pagenum - 1) && index < query.pagesize * query.pagenum) {
                    dataShowList.push(value)
                }
            })
            // 根据页码值和每页显示的数据
            res.send({
                status: 0,
                message: '获取文章列表成功',
                data: dataShowList,
                total: dataList.length
            })
        })
    })
}

// 根据id删除文章数据
exports.delArticleByIdHandler = (req, res) => {
    // 从数据库中删除数据，不是真正的删除，只是给一个删除的状态
    const sql = 'update ev_articles set is_delete=1 where Id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.affectedRows !== 1) return req.sendError('文章删除失败')
        res.send({
            status: 0,
            message: '文章删除成功'
        })
    })
}

// 根据id获取文章详情
exports.getArticleByIdHandler = (req, res) => {
    // 根据id查找数据库中的数据
    const sql = 'select * from ev_articles where is_delete=? and Id=?'
    db.query(sql, [0, req.params.id], (err, results) => {
        if (err) return res.sendError(err) //sql语句执行失败
        if (results.length !== 1) return res.sendError('获取文章详情失败')
        res.send({
            status: 0,
            message: '获取文章详情成功',
            data: results[0]
        })
    })
}

// 根据id更新文章信息
exports.editArticleByIdHandler = (req,res)=>{
    // 拼接好需要添加到数据库中的数据
    const articleData = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename), //封面地址
    }
    // 更新数据库信息
    const sql = 'update ev_articles set ? where Id=?'
    db.query(sql,[articleData,req.body.Id],(err,results)=>{
        if(err) return res.sendError(err) // sql语句执行失败
        if(results.affectedRows!==1) return res.sendError('文章信息更新失败')
        res.send({
            status:0,
            message:'文章信息更新成功',
        })
    })

}