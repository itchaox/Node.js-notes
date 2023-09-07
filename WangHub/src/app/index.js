/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 17:05
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-07 17:13
 * @desc       :
 */

const Koa = require("koa");
const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const useUserRouter = require("../router/user-router");

const app = new Koa();

app.use(bodyParser());
useUserRouter(app);

module.exports = app;
