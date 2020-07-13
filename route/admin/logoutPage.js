//实现退出功能
module.exports = (req, res)=> {
    //删除session
    res.clearCookie('connect.sid');
    //重定向到用户登录页面
    res.redirect('/admin/login');
}