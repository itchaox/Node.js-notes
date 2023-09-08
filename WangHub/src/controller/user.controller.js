/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:22
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 14:36
 * @desc       :
 */

const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 1. 获取用户信息
    const user = ctx.request.body;

    // 2. 判断逻辑
    // 2.1 用户名或密码不能为空
    const { name, password } = user;

    if (!name || !password) {
      ctx.body = {
        code: -1001,
        message: "用户名或密码不能为空~",
      };
      return;
    }

    // 用户名在数据中的唯一性校验

    const users = await userService.findUserByName(name);
    if (users.length > 0) {
      ctx.body = {
        code: -1002,
        message: "用户名已存在，请修改用户名后重试~",
      };
      return;
    }

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
