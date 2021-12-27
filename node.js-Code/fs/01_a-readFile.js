const fs = require('fs')
fs.readFile('./01_a.txt', 'utf8', function (err, data) {
  console.log(err);
  console.log('____');
  console.log(data);
})