/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-14 15:21
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, getList, getMoment, update } = require("../controller/moment.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 增
momentRouter.post("/", verifyAuth, create);

// 删

// 改
momentRouter.patch("/:momentId", verifyAuth, update);

// 查
momentRouter.get("/", getList);
momentRouter.get("/:momentId", getMoment);

const useMomentRouter = (app) => {
  app.use(momentRouter.routes());
  app.use(momentRouter.allowedMethods());
};

module.exports = useMomentRouter;
