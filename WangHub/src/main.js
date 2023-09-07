/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 13:26
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-07 17:03
 * @desc       :
 */

const app = require("./app");
const { SERVER_PORT } = require("./config/server");

app.listen(SERVER_PORT, () => {
  console.log("服务启动成功...");
});
