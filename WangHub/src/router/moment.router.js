/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-14 14:38
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, getList, getMoment } = require("../controller/moment.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", getList);
momentRouter.get("/:momentId", getMoment);

const useMomentRouter = (app) => {
  app.use(momentRouter.routes());
  app.use(momentRouter.allowedMethods());
};

module.exports = useMomentRouter;
