/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 14:04
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const loginController = require("../controller/login.controller");
const { verifyUser } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyUser, loginController.sign);

const useLoginRouter = (app) => {
  app.use(loginRouter.routes());
  app.use(loginRouter.allowedMethods());
};

module.exports = useLoginRouter;
