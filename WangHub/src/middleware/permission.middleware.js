/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-14 15:34
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-14 16:02
 * @desc       :
 */

const { IS_NOT_PERMISSION } = require("../config/error-constants");
const permissionService = require("../service/permission.service");

const verifyMomentPermission = async (ctx, next) => {
  // 获取用户id 和 动态id
  const { id } = ctx.user;
  const { momentId } = ctx.params;

  // 通过动态id去查询用户是否有权限操作该动态
  const isPermission = await permissionService.checkMoment(momentId, id);
  console.log("🚀  isPermission:", isPermission);

  if (!isPermission) {
    return ctx.app.emit("error", IS_NOT_PERMISSION, ctx);
  }

  await next();
};

module.exports = {
  verifyMomentPermission,
};
