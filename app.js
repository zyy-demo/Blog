//引用express框架
const express = require('express');
const path = require('path');
//引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
//引入express-session 模块
const session = require('express-session');
//导入第三方模块dateformat第三方模块
const dateFormat = require('dateformat');
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');

//处理post请求参数
app.use(bodyParser.urlencoded({extended: false}));
//app.use拦截所有的请求
//配置session
app.use(session({secret: 'secret key'}));
//导入art-template模板引擎
const template = require('art-template');
//配置模板信息
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname, 'views'));
//告诉express框架模板默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时，所使用的的模板引擎是什么
app.engine('art', require('express-art-template'));
//向模板中导入dateformat变量
template.defaults.imports.dateFormat = dateFormat;
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

//路由对象的导入
const home = require('./route/home');
const admin = require('./route/admin');
const { nextTick } = require('process');

//拦截请求，判断用户的登录状态
app.use('/admin', require('./middleware/logGuard'));


//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//定义错误处理中间件
//如何触发错误处理中间件，next触发错误处理中间件
// 以及如何将错误信息传递过来
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    //JSON.parse()
    // const result = JSON.parse(err);
    const result = JSON.parse(err);
    const params = [];
    for(let attr in result) {
        if(attr != path){
            params.push(attr + '=' + result[attr]);
        }
    }
    // res.redirect(`${result.path}?message=${result.message}`);
    res.redirect(`${result.path}?${params.join('&')}`);

} )





//监听端口
app.listen(3000);
console.log('网站服务器启动成功，请访问localhost:3000');
