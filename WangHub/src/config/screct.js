/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-13 14:12
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-13 15:59
 * @desc       :
 */

const fs = require("fs");
const path = require("path");

// const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
// const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private-key.pem"), "utf-8");
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public-key.pem"), "utf-8");

// const PRIVATE_KEY = fs.readFileSync("private-key.pem", "utf8");
// const PUBLIC_KEY = fs.readFileSync("public-key.pem", "utf8");

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
};
