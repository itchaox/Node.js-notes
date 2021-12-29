// 1.导入http模块
const http = require('http')
// 2.创建web服务器实例
const server = http.createServer()
// 3.为服务器实例绑定request事件，监听客户端请求
server.on('request', (req, res) => {
  const str = '请求地址：' + req.url
  console.log('服务器被访问！');
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(str)
})
// 4.启动服务器
server.listen(80, () => {
  console.log('服务器地址：http://127.0.0.1');
})