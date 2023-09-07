/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 15:30
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-07 16:53
 * @desc       :
 */
const dotenv = require("dotenv");
dotenv.config();

module.exports = { SERVER_PORT } = process.env;
