const fs = require('fs')
fs.writeFile('./02_1.txt', '123', function (err) {
  if (err) {
    console.log('写入失败：', err);
  }
  else {
    console.log('写入成功！');
  }
})
