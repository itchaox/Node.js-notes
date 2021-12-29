// 1. 导入 express 模块
const express = require('express')
// 2. 调用 express.Router() 创建路由模块实例
const apiRouter = express.Router()

// 编写get接口
apiRouter.get('/get', (req, res) => {
  // 1. 获取到客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 2. 调用 res.send() 方法，把数据响应给客户端
  res.send({
    state: 0,
    msg: 'get 请求成功',
    data: query
  })
})

// 编写 POST 请求
apiRouter.post('/post', (req, res) => {
  // 1. 获取客户端通过请求体，发送到服务器的 URL-encoded 数据
  const body = req.body
  // 2. 调用 res.send() 方法，把数据响应给客户端
  // 注意：要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({extended:false}))
  res.send({
    state: 0,
    msg: 'post 请求成功',
    data: body
  })
})

// 3. 导入路由模块实例
module.exports = apiRouter
