//引入Joi模块
const Joi = require('joi');
//导入bcrypt
const bcrypt = require('bcryptjs');
//创建用户集合
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址不重复
        unique: true,
        required: true  
    },
    password:{
        type: String,
        required: true
    },
    //admin:超级管理员
    //common：普通用户
    role:{
        type: String,
        required: true
    },
    //0:启用状态
    //1:禁用状态
    state:{
        type: Number,
        default: 0
    }
});
//创建用户集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSaltSync(10);
    const pass = await bcrypt.hashSync('123456', salt);
    const user = await User.create({
        username: 'iteheima',
        email: 'iteheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    
    });
}

// createUser();

//创建用户
//create方法返回一个promise对象

//验证用户信息的数据操作
const validateUser = user => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        //vaild（）验证，客户端只能在这里传递normal和admin，其他都是不通过的
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0,1).required().error(new Error('状态值不合法'))
    };
    //实施验证
    // return await Joi.validate(req.body, schema);
    //将req.body替换成user,validate 方法返回一个promise对象
    return Joi.validate(user, schema);

}

//将用户集合作为模块成员进行导出
module.exports = {
    //es6 对象名和属性名相同
    User,
    validateUser
}
