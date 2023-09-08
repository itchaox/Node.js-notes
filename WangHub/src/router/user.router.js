/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 16:58
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 10:24
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const UserController = require("../controller/user.controller");

const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.post("/register", UserController.create);

const useUserRouter = (app) => {
  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());
};

module.exports = useUserRouter;
