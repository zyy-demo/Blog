
const {User} = require('../../model/user');
           //标识，标识当前访问的是用户管理页面
// module.exports = async (req, res) => {
//     //获取到地址栏中的id参数，判断是添加操作还是修改操作
//     //通过req.query获取到地址栏中的错误信息，query是一个对象，可以通过解构的方式将message解构出来
//     const {message, id} = req.query;
//
//     //如果当前传递了id参数，说明是修改操作，没有则是添加操作
//     if(id) {
//         //修改操作
//         // 将用户的信息查询出来，显示给用户(渲染页面)，供用户修改
//         let user = await User.findOne({_id: id});
//         //渲染用户编辑页面
//         res.render('admin/user-edit', {
//             message: message,
//             user: user,
//             link: '/admin/user-modify?id=' + id,
//             button: '修改'
//         });
//     }else {
//         //添加操作
//         res.render('admin/user-edit', {
//             message: message,
//             link: '/admin/user-edit',
//             button: '添加'
//         });
//     }
// }
module.exports = (req, res) => {

    req.app.locals.currentLink = 'user';
    const message = req.query.message;
    res.render('admin/user-edit', {
        message: message,
        link: '/admin/user-edit'
    })
}