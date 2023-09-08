/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 14:43
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 15:27
 * @desc       :
 */

const userService = require("../service/user.service");

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

module.exports = {
  verifyUser,
};
