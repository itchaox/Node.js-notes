/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-14 15:41
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-15 10:14
 * @desc       :
 */

const connection = require("../app/database");

class PermissionService {
  async checkMoment(userId, momentId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, userId]);
    console.log("🚀  result:", result);

    // return !!result.length;
    // FIXME 暂时直接允许权限通过
    return true;
  }
}

module.exports = new PermissionService();
