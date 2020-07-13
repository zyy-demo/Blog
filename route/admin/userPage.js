const {User} = require('../../model/user');

module.exports = async (req, res) => {
    //标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    // res.render('admin/user', {
    //     msg: req.session.username
    // });
    //接收客户端传递过来的当前页参数,没有传递，则默认显示 1
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 10;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数,需要向上取整
    let total = Math.ceil(count / pagesize);
    //页码对应的开始位置
    let start = (page -1 ) * pagesize;
    //将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start)
    // users是一个数组
    // 渲染用户列表模板,需要找到模板
    res.render('admin/user', {
        users: users,
        page: parseInt(page), //当前页
        total: total //总页数
    });
}