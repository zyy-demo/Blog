const {Article} = require('../../model/article');
//导入mongoose-sex-page模块,实现分页
const pagination = require('mongoose-sex-page');

module.exports = async (req, res)=> {
  //接收客户端传来的页码
  const page = req.query.page;
  //标识，标识当前访问的是用户管理页面
  req.app.locals.currentLink = 'article';
  //查询所有文章数据,,多集合联合查询，populate查询s、author的详细信息，author字段是一个对象类型
  // let articles = await Article.find().populate('author');
  let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
  //page: 指定当前页，size：指定每页要显示的数据条数， display 指定客户端要显示的页码数量, exec  向数据库发送查询请求
  // res.send(articles);

  //渲染文章列表页面模板
  res.render('admin/article.art', {
    articles: articles
  //  articles 是包含所有文章的数组，数组的每一个元素都是一个对象， 在经过pagination处理后，变成一个对象
  });
}