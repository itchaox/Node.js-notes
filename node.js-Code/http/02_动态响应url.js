const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  let content = '<h1>404 默认显示！</h1>'
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页内容</h1>'
  } else {
    content = '<h1>关于内容</h1>'
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
  console.log('服务器被访问！');
})

server.listen(80, () => {

  console.log('服务器地址：http://127.0.0.1');
})