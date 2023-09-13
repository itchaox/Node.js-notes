/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 16:57
 * @desc       :
 */

const KoaRouter = require("@koa/router");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/");

const useMomentRouter = (app) => {
  app.use(momentRouter.routes());
  app.use(momentRouter.allowedMethods());
};

module.exports = useMomentRouter;
