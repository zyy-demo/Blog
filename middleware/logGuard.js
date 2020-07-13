const guard = (req, res, next) => {
    //1.判断用户访问的是否是登录页面
    //2.判断用户的登录状态
    //如果用户是登录状态，请求放行
    //如果用户不是登录状态 请求重定向到登录页面
    //下面if判断语句中的意思：如果用户访问的不是登录页面，并且用户还没有登录，就重定向到登录页面让用户进行登录
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        //用户是登录状态，将请求放行
        next();
    }
}

module.exports = guard;