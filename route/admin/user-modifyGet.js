const {User} = require('../../model/user');
module.exports = async (req, res) => {
  const {message, id} = req.query;
  //将用户id查询出来
  let user = await User.findOne({_id: id});
  //渲染修改信息的编辑页面
  res.render('admin/user-modify', {
    message: message,
    user: user,
    link: '/admin/user-modify?id=' + id
  });
}
