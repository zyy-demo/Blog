//引入用户集合构造函数
const {User, validateUser} = require('../../model/user');
const bcryptjs = require('bcryptjs');

module.exports = async (req, res, next)=>{
    //实施验证
    try {
        await validateUser(req.body)
    }catch(e) {
        //验证没有通过
        //e.message
        //重定向到用户添加页面
      //return res.redirect('/admin/user-edit?message=' + e.message)
    //next只能接受一个参数，但这里需要传递两个参数，需要将两个参数写成对象类型，将对象类型转换为字符串
    //JSON.stringify() 将对象数据类型转换为字符串数据类型，返回值为转换完成之后的结果
      return next(JSON.stringify({path:'/admin/user-edit', message: e.message}))
    }

    //根据邮箱地址查询用户是否存在
    //findone返回值为空则不存在该用户，返回值不为空表示查询到该用户，返回值为该用户信息
    let user  = await User.findOne({email: req.body.email});
    //如果用户已经存在，邮箱地址已经被被人占用
    if(user) {
        //重定向到用户添加页面
        //在redirect 内部除了做了重定向以外还做了res.end()这个事情
      // return res.redirect('/admin/user-edit?message=' + '邮箱地址已被占用');
      return next(JSON.stringify({path:'/admin/user-edit', message: '邮箱地址已被占用'}) )
    }
    //对密码进行加密处理
    //生成随机字符串
    const salt = await bcryptjs.genSaltSync(10);
    //加密
    const password = await bcryptjs.hashSync(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //将用户信息添加到数据库当中
    await User.create(req.body);
    //将页面重定向到用户列表页面
    res.redirect('/admin/user');
    //res.send(user);
}