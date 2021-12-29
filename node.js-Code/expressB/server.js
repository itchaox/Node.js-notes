const express = require('express')

const app = express()

// 1. 导入路由模块
const bRouter = require('./b.js')
// 2. 注册路由
app.use(bRouter)

app.listen(80, () => {
  console.log('http://127.0.0.1');
})