/**
 * @description:文章管理路由模块
 */

// 导入express路由模块
const express = require('express')
const router = express.Router()
// 导入multer来解析multipart/form-data格式的表单数据
const multer = require('multer')
// 导入path模块
const path = require('path')
// 导入文章管理路由处理函数
const { addArticleHandler, getArticleListHandler, delArticleByIdHandler, getArticleByIdHandler,editArticleByIdHandler } = require('../router_handler/article')
// 导入表单验证中间件和文章管理模块表单验证规则
const expressJoi = require('@escook/express-joi')
const { addArticleSchema, getArticleListSchema, delArticleByIdSchema, getArticleByIdSchema,updateArticleSchema } = require('../schema/article')

// 定义客户端上传的表单文件的上传路径
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

// 发布新文章
//upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中,对req.body中的数据使用表单验证中间件验证
router.post('/add', uploads.single('cover_img'), expressJoi(addArticleSchema), addArticleHandler)
// 获取文章列表
router.get('/list', expressJoi(getArticleListSchema), getArticleListHandler)
// 根据id删除文章数据
router.get('/delete/:id', expressJoi(delArticleByIdSchema), delArticleByIdHandler)
// 根据id获取文章数据
router.get('/:id', expressJoi(getArticleByIdSchema), getArticleByIdHandler)
// 根据id更新文章数据
router.post('/edit', uploads.single('cover_img'),expressJoi(updateArticleSchema),editArticleByIdHandler)

// 导出路由模块
module.exports = router