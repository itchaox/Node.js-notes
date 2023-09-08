/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:22
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 15:00
 * @desc       :
 */

const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 1. 获取用户信息
    const user = ctx.request.body;

    // 3. 存储数据库
    const result = await userService.create(user);

    // 查看存储结果，告知前端存储情况
    ctx.body = {
      message: "恭喜你！注册成功！",
      data: result,
    };
    next();
  }
}

module.exports = new UserController();
