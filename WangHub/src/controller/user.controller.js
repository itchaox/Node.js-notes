/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:22
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 10:27
 * @desc       :
 */

const userService = require("../service/user.service");

class UserController {
  create(ctx, next) {
    // 获取用户信息
    const user = ctx.request.body;

    // 存储数据库
    userService.create(user);

    // 查看存储结果，告知前端存储情况
    ctx.body = "恭喜你！注册成功！";
    next();
  }
}

module.exports = new UserController();
