//导入bcrypt
const bcrypt = require('bcrypt');



async function run(){
    //生成随机字符串
    //genSalt方法接收一个数值作为参数
    //数值越大，生成的随机字符串复杂度越高
    //数值越小，生成的随机字符串复杂程度越低
    // 默认值是10
    //await 关键字只能出现在异步函数中，所以要将run加async声明为一个异步函数
    //返回值是一个promise对象
    //返回生成的随机字符串
    const salt = await bcrypt.genSalt();
    //对密码进行加密
    //第一个参数：要进行加密的明文
    //第二个参数：随机字符串
    //返回值是加密后的密码
    const result = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(result);
    
    
}