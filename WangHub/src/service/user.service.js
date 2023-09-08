/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-08 10:25
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 10:52
 * @desc       :
 */

const connection = require("../app/database");

class UserService {
  create(user) {
    connection.execute();
  }
}

module.exports = new UserService();
