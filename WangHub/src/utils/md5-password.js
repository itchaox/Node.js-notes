/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 10:00
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 10:42
 * @desc       :
 */

const crypto = require("crypto");

function md5password(password) {
  const md5 = crypto.createHash("md5");
  const _md5password = md5.update(password).digest("hex");

  return _md5password;
}

module.exports = md5password;
