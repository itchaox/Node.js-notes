/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 16:58
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-07 17:17
 * @desc       :
 */

const KoaRouter = require("@koa/router");

const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.post("/register", (ctx, next) => {
  console.log("注册信息：", ctx.request.body);
  ctx.body = "恭喜你！注册成功！";
  next();
});

const useUserRouter = (app) => {
  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());
};

module.exports = useUserRouter;
