// 1. 导入 express
const express = require('express')

// 2. 创建 web 服务器
const app = express()

app.get('/user', (req, res) => {
  res.send({ name: 'itchao', age: 22, height: 1.85 })
})

app.get('/', (req, res) => {
  // req.query 默认是一个空对象
  // 客户端使用 ? name = itchao & age=22，发送到服务器的参数
  // 可以通过 req.query 对象访问到,如：req.query.name req.query.age
  console.log(req.query);
  res.send(req.query)
})

// URL 地址中，可以通过：参数名的形式，匹配动态参数值
app.get('/user/:id', (req, res) => {
  // req.params 默认是一个空对象
  // 里面存放这通过 ：动态匹配到的参数值
  console.log(req.params);
  res.send(req.params)
})

app.post('/user', (req, res) => {
  res.send('post 请求成功')
})

// 3. 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log('express 创建的服务器地址：http://127.0.0.1');
})