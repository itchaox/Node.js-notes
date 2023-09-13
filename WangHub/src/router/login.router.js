/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 16:27
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const loginController = require("../controller/login.controller");
const { verifyUser, verifyAuth } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyUser, loginController.sign);
loginRouter.post("/list", verifyAuth, (ctx, next) => {
  ctx.body = "验证通过！！！";
});

const useLoginRouter = (app) => {
  app.use(loginRouter.routes());
  app.use(loginRouter.allowedMethods());
};

module.exports = useLoginRouter;
