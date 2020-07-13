//创建博客管理页面路由
//引用express框架
const express = require('express');
const { model } = require("mongoose");

//创建博客管理页面路由
const admin = express.Router();
//创建二级路由
admin.get('/login', require('./admin/loginPage'));
//实现登录功能的路由
admin.post('/login', require('./admin/login'));

//创建用户列表路由
admin.get('/user', require('./admin/userPage'));

//实现退出功能
admin.get('/logout', require('./admin/logoutPage'));

//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

//创建实现用户添加功能的路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

//创建用户修改编辑页面路由
admin.get('/user-modify', require('./admin/user-modifyGet'));

// 创建用户修改功能的路由
admin.post('/user-modify', require('./admin/user-modify'));

//删除用户功能的路由
admin.get('/delete', require('./admin/delete'));

//文章列表页面路由
admin.get('/article', require('./admin/article'));
//文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
//实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'));


//将路由对象作为模块成员进行导出

module.exports = admin;