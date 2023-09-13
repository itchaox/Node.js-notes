/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 14:43
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 16:28
 * @desc       :
 */

const jwt = require("jsonwebtoken");

const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR,
  UN_AUTHORIZATION,
} = require("../config/error-constants");
const { PUBLIC_KEY } = require("../config/screct");

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

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithm: ["RS256"],
    });

    ctx.user = result;

    await next();
  } catch (error) {
    ctx.app.emit("error", UN_AUTHORIZATION, ctx);
  }
};

module.exports = {
  verifyUser,
  verifyAuth,
};
