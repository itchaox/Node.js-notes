/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:51
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 11:36
 * @desc       :
 */
const mysql = require("mysql2");

// 1. 创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "wang_hub",
  user: "root",
  password: "123456",
  connectionLimit: 5,
});

// 2. 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("连接错误~", err);
    return;
  }

  connection.connect((err) => {
    if (err) {
      console.log("数据库连接失败~", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

// 3. 获取连接池对象
const connection = connectionPool.promise();

module.exports = connection;
