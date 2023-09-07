/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-06 16:43
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-07 10:19
 * @desc       :
 */
const Koa = require("koa");
const KoaRouter = require("@koa/router");

const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(bodyParser());

const userRouter = new KoaRouter({ prefix: "/users" });

// get query
userRouter.get("/login", (ctx, next) => {
  ctx.body = "userRouter login 成功" + JSON.stringify(ctx.query);
});

// get params /:id
userRouter.get("/login/:id", (ctx, next) => {
  const is = true;

  if (is) {
    console.log("成功");
    ctx.body = "成功";

    ctx.app.emit("error", 500, ctx);
  } else {
    ctx.body = "wangchao";
    ctx.app.emit("error", 401, ctx);
  }
});

//FIXME 错误处理
app.on("error", (code, ctx) => {
  let message = "";

  switch (code) {
    case 401:
      message = "鉴权失败";
      break;
    case 500:
      message = "服务器错误";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});

// post json
userRouter.post("/login", (ctx, next) => {
  ctx.body = "123";
  const is = true;
  if (!is) {
    console.log("成功");
  } else {
    console.log(ctx);
    ctx.body = "123";
  }
});

app.use(userRouter.routes());

app.listen("8989", () => {
  console.log("6666");
});
