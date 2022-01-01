// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库连接关系
const db = mysql.createPool({
  host: '127.0.0.1',  // 数据库 IP 地址
  user: 'root',  // 数据库账号
  password: 'admin123',  // 数据库密码
  database: 'database01'  // 指定操作哪个数据库
})

// 3. 测试 mysql 模块是否正常工作
db.query("select 'itchao'", (err, res) => {
  if (err) {
    console.log('错误信息：', err);
  }
  else {
    console.log(res);
  }
})

// 4. 查询数据
const select = 'select * from users'
// 执行 select 查询语句，输出结果是数组
db.query(select, (err, res) => {
  if (err) {
    console.log('错误信息：', err.message);
  }
  else {
    console.log(res);
  }
})

// 5. 插入数据
// 1.定义插入数据对象
const user = {
  username: '插入数据1',
  password: 'q'
}
// 2. 待执行的 SQL 语句，英文的 ? 表示占位符
const insertInto = 'insert into users (username, password) values (?, ?)'
// 3. 使用数组形式，依次为 ? 占位符指定具体值
// 执行 insert into 语句，输出结果是对象
db.query(insertInto, [user.username, user.password], (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断插入数据是否成功
  if (res.affectedRows === 1) {
    console.log('插入数据成功！');
  }
})

// 6. 插入数据 —— 简写方式
// 1.定义插入数据对象
const userA = {
  username: '新数据',
  password: 'a'
}
// 2. 待执行的 SQL 语句，set 表示设置值，英文的 ? 表示占位符
const insertIntoA = 'insert into users set ?'
// 执行 insert into 语句，输出结果是对象
db.query(insertIntoA, userA, (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断插入数据是否成功
  if (res.affectedRows === 1) {
    console.log('数据插入成功');
  }
})

// 7. 更新数据
// 1. 找到将更新的数据对象并写入新值到该数据对象
const userC = {
  id: 7,
  username: '更新数据2',
  password: 'b'
}
// 2. 定义 SQL 语句
const updateC = 'update users set username=?, password=? where id=?'
// 3. 执行 SQL 语句
// 执行 update 语句，输出结果是对象
db.query(updateC, [userC.username, userC.password, userC.id], (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断更新数据是否成功
  if (res.affectedRows) {
    console.log('更新数据成功！C');
  }
})


// 8. 更新数据 - 简写方式
// 1. 找到将更新的数据对象并写入新值到该数据对象
const userB = {
  id: 6,
  username: '更新数据B2',
  password: 'b'
}
// 2. 定义 SQL 语句
const update = 'update users set ? where  id = ?'
// 3. 执行 SQL 语句
// 执行 update 语句，输出结果是对象
db.query(update, [userB, userB.id], (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断更新数据是否成功
  if (res.affectedRows) {
    console.log('更新数据成功！B');
  }
})

// 9. 删除数据
// 1. 定义 SQL 语句
const deleteA = 'delete from users where id = ?'
// 2. 执行 SQL 语句
// 执行 delete 语句，输出结果是对象
db.query(deleteA, 7, (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断删除数据是否成功
  if (res.affectedRows === 1) {
    console.log('删除数据成功！');
  }
})

// 10. 标记删除
// 1. 定义 SQL 语句
const deleteTag = 'update users set state = ? where id = ?'
// 2. 执行 SQL 语句
// 执行 update 语句，输出结果是对象
db.query(deleteTag, [1, 6], (err, res) => {
  if (err) {
    return console.log(err.message);
  }
  // 通过 affectedRows 属性，可以判断标记删除数据是否成功
  if (res.affectedRows === 1) {
    console.log('标记删除成功！');
  }
})