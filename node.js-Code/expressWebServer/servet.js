// 1. 导入 express 模块
const express = require('express');
// 2. 创建 express 服务器实例
const app = express();
app.use(express.urlencoded({ extended: false }))

// 导入 cors 第三方中间件
const cors = require('cors')
// 配置 cors 中间件
app.use(cors())

// 导入路由模块
const apiRouter = require('./apiRouter')
// 注册路由模块
app.use('/api', apiRouter);

// 3. 调用 app.listen()，指定端口号并启动 web 服务器
app.listen(80, () => {
  console.log('http://127.0.0.1');
})