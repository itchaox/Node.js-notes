/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 17:05
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-14 11:07
 * @desc       :
 */

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useUserRouter = require("../router/user.router");
const useLoginRouter = require("../router/login.router");
const useMomentRouter = require("../router/moment.router");

const app = new Koa();

app.use(bodyParser());
useUserRouter(app);
useLoginRouter(app);
useMomentRouter(app);

module.exports = app;
