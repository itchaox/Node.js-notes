// 1. 导入 express
const express = require('express');
// 2. 创建路由对象
const router = express.Router()
// 3. 挂载具体路由
router.get('/user/list', function (req, res) {
  res.send('GET')
})

router.post('/user/add', function (req, res) {
  res.send('POST!')
})

// 4. 导出路由对象
module.exports = router