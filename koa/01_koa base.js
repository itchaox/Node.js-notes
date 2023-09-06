/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-06 16:43
 * @LastAuthor : itchaox
 * @LastTime   : 2023-09-06 22:33
 * @desc       :
 */
const Koa = require('koa');
const KoaRouter = require('@koa/router');
const multer = require('@koa/multer');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const formParser = multer({
  dest: './imgs',
});

app.use(bodyParser());

const userRouter = new KoaRouter({ prefix: '/users' });

// get query
userRouter.get('/login', (ctx, next) => {
  ctx.body = 'userRouter login 成功' + JSON.stringify(ctx.query);
});

// get params /:id
userRouter.get('/login/:id', (ctx, next) => {
  const id = ctx.params.id;

  ctx.body = '您输入的id为：' + id;
});

// post json
userRouter.post('/login', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = '恭喜你!!!';
});

userRouter.post('/form', formParser.array('img'), (ctx, next) => {
  console.log(ctx.request.file);
  ctx.body = '文件上传成功';
});

app.use(userRouter.routes());

app.listen('8989', () => {
  console.log('6666');
});
