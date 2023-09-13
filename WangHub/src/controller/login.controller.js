/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:22
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 16:01
 * @desc       :
 */

const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    ctx.body = {
      code: 0,
      message: "登录成功！",
      data: {
        token,
        id,
        name,
      },
    };
  }
}

module.exports = new LoginController();
