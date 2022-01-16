/**
 * @description:文章分类数据表单验证
 */

// 导入joi,用来定义表单验证规则
const joi = require('joi')

// 文章分类名称验证规则
const name = joi.string().required()
// 文章分类别名验证规则
const alias = joi.string().alphanum().required()
// 文章分类Id验证规则
const id = joi.number().integer().min(1).required()

// 导出新增文章分类表单验证规则
exports.addCatesSchema = {
    body: {
        name,
        alias
    }
}
// 导出删除文章分类验证规则
exports.delCatesByIdSchema = {
    params: {
        id
    }
}
// 导出根据id获取文章分类验证规则
exports.getCateByIdSchema = exports.delCatesByIdSchema
// 导出根据id更新文章分类验证规则
exports.updateCateByIdSchema = {
    body: {
        Id: id,
        name,
        alias
    }
}