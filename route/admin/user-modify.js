const { User } = require('../../model/user');
const bcryptjs = require('bcryptjs');
module.exports = async (req, res, next)=> {
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const state = req.body.state;
    const password = req.body.password;

  //即将要修改的用户的id
    const id = req.query.id;
    //查询用户
    let user = await User.findOne({id_:id});
    // 密码比对,比对失败返回false，比对成功返回true
    const isValid = await bcryptjs.compareSync(password, user.password);
     if(isValid){  //比对成功
        //res.send('密码比对成功');
        //将用户信息跟新到数据库中
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //重定向到用户列表页面
        res.redirect('/admin/user');
    }else {
        //密码比对失败
        let obj = {path:'/admin/user-modify', message:'密码比对失败，不能进行用户信息的修改', id:id};
        return next(JSON.stringify(obj));
    }
    // try{
    //   await bcryptjs.compareSync(password, user.password);
    // }catch (e) {
    //   return next(JSON.stringify({path:'/admin/user-modify', message: e.message}))
    // }
    //   //将用户信息跟新到数据库中
    // await User.updateOne({_id: id}, {
    //       username: username,
    //       email: email,
    //       role: role,
    //       state: state
    // });
    //   //重定向到用户列表页面
    // res.redirect('/admin/user');
    // res.send(user);
}