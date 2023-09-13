/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 15:13
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 14:28
 * @desc       :
 */
const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR,
} = require("../config/error-constants");

app.on("error", (error, ctx) => {
  let code = -1;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = 1001;
      message = "用户名或密码不能为空~";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = 1002;
      message = "用户名已存在，请修改用户名后重试~";
      break;
    case NAME_IS_NOT_EXISTS:
      code = 1003;
      message = "用户名不存在, 请检查用户名~";
      break;
    case PASSWORD_IS_ERROR:
      code = 1004;
      message = "密码错误, 请修改后重试~";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
