/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 14:43
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 10:20
 * @desc       :
 */

const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");

const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error-constants");

const verifyUser = async (ctx, next) => {
  // 2. 判断逻辑
  // 2.1 用户名或密码不能为空
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 用户名在数据中的唯一性校验

  const users = await userService.findUserByName(name);
  if (users.length > 0) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  await next();
};

const encryptionPassword = async (ctx, next) => {
  // 1. 取出密码
  const { password } = ctx.request.body;

  // 2. 加密
  ctx.request.body.password = md5password(password);

  // 3. 执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  encryptionPassword,
};
