/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 13:45
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-15 10:16
 * @desc       :
 */

const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, getList, getMoment, update, remove } = require("../controller/moment.controller");
const { verifyMomentPermission } = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 增
momentRouter.post("/", verifyAuth, create);

// 删
momentRouter.delete("/:momentId", verifyAuth, verifyMomentPermission, remove);

// 改`
momentRouter.patch("/:momentId", verifyAuth, verifyMomentPermission, update);

// 查
momentRouter.get("/", getList);
momentRouter.get("/:momentId", getMoment);

const useMomentRouter = (app) => {
  app.use(momentRouter.routes());
  app.use(momentRouter.allowedMethods());
};

module.exports = useMomentRouter;
