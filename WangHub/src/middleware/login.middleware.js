/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 14:43
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 14:24
 * @desc       :
 */

const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_ERROR } = require("../config/error-constants");

const verifyUser = async (ctx, next) => {
  // 用户名或密码不能为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  const users = await userService.findUserByName(name);
  const user = users[0];

  // 用户不存在
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 密码不正确
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_ERROR, ctx);
  }

  ctx.user = user;
  await next();
};

module.exports = {
  verifyUser,
};
