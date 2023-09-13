/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:22
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 15:28
 * @desc       :
 */

const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY);

    console.log("🚀  token:", token);

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
