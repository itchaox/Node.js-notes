/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-14 15:41
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-14 16:15
 * @desc       :
 */

const connection = require("../app/database");

class PermissionService {
  async checkMoment(userId, momentId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, userId]);
    console.log("🚀  result:", result);

    return !!result.length;
  }
}

module.exports = new PermissionService();
