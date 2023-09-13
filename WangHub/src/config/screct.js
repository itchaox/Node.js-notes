/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 14:12
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 15:27
 * @desc       :
 */

const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
};
