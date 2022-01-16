/**
 * @description:文章分类管理路由模块
 */

// 导入express路由模块
const express = require('express')
const router = express.Router()
// 导入文章分类路由处理函数
const { getArtcateHandler, addCatesHandler, delCatesByIdHandler, getCateByIdHandler, updateCateByIdHandler } = require('../router_handler/artcate')
// 导入表单验证中间件和文章分类规则表单验证规则
const expressJoi = require('@escook/express-joi')
const { addCatesSchema, delCatesByIdSchema, getCateByIdSchema, updateCateByIdSchema } = require('../schema/artcate')

// 获取文章分类
router.get('/cates', getArtcateHandler)
// 新增文章分类,需要表单验证中间件对请求体数据格式进行验证，通过后执行路由处理函数
router.post('/addcates', expressJoi(addCatesSchema), addCatesHandler)
// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(delCatesByIdSchema), delCatesByIdHandler)
//  根据id获取文章分类
router.get('/cates/:id', expressJoi(getCateByIdSchema), getCateByIdHandler)
// 根据id更新文章分类
router.post('/updatecate', expressJoi(updateCateByIdSchema), updateCateByIdHandler)

// 导出路由模块
module.exports = router