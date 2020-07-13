//导入用户集合构造函数
const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');

//只有一个函数，可以直接导出
module.exports = async (req, res)=> {
    //接收请求参数
    const {email, password} = req.body;
    //如果用户没有输入邮件地址或者密码
    if(email.trim().length == 0 || password.trim().length == 0) {
        //可以终止代码向下执行
       return res.status(400).render('admin/error', {msg:'邮件地址或者密码错误'});
    }
    //根据邮箱地址查询用户信息
    //查询到的话user是一个对象类型，对象中存储到的是用户信息，没有查询到user变量为空
    let user = await User.findOne({email});
    //查询到了用户
    if(user) {
        //将客户端传递过来的密码和用户信息进行比对
        //bcrypt.compareSync()方法返回值是一个布尔值，true 比对成功， false 比对失败
        let isValid = await bcrypt.compareSync(password, user.password);
        //密码比对成功
        if(isValid) {
            //登录成功
            //将用户名存储在请求对象中
            req.session.username = user.username;
            // res.status(200).send('登录成功');
            //公共部分，req.app就是app.js中的app
            req.app.locals.userInfo = user;
            //重定向到用户列表页面
            res.redirect('/admin/user');
        }else {
            res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'});
        }

    }else {
        //没有查询到用户
        res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'});
    }

}

