/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-07 13:26
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-08 15:17
 * @desc       :
 */

const app = require("./app");
const { SERVER_PORT } = require("./config/server");
require("./utils/handle-error");

app.listen(SERVER_PORT, () => {
  console.log("服务启动成功...");
});
