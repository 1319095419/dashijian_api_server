/**
 * @description: 文章管理模块表单验证规则
 */

// 导入joi定义表单验证规则
const joi = require('joi')

// 文章标题验证规则
const title = joi.string().required()
// 文章类别id验证规则
const cate_id = joi.number().integer().min(1).required()
// 文章内容验证规则
const content = joi.string().required().allow('')
//  文章发布状态验证规则
const state = joi.string().valid('草稿', '已发布').required()
// 页码值验证规则
const pagenum = joi.number().integer().min(1).required()
// 每页数据条数验证规则
const pagesize = joi.number().integer().min(1).required()

//  导出新增文章表单验证规则
exports.addArticleSchema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}
// 导出获取文章列表表单验证规则
exports.getArticleListSchema = {
    query: {
        pagenum,
        pagesize,
        cate_id: joi.string().allow(''),
        state: joi.string().valid('草稿', '已发布', '')
    }
}
// 导出删除文章表单验证规则
exports.delArticleByIdSchema = {
    params: {
        id: cate_id
    }
}
// 导出获取文章详情数据表单验证规则
exports.getArticleByIdSchema = exports.delArticleByIdSchema
// 导出更新文章表单验证规则
exports.updateArticleSchema = {
    body:{
        Id:cate_id,
        title,
        cate_id,
        content,
        state
    }
}
