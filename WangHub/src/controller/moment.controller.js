/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-09-14 11:10
 * @LastAuthor : wangchao
 * @LastTime   : 2023-09-15 10:11
 * @desc       :
 */

const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1. 获取发布者
    const { id } = ctx.user;

    // 2. 发布内容
    const { content } = ctx.request.body;

    // 3. 将数据存储在数据库中
    const result = await momentService.create({ content, id });

    ctx.body = {
      code: 0,
      message: "动态发布成功~",
      data: result,
    };
  }

  async getList(ctx, next) {
    // 1. 从数据库中查询动态列表
    const { offset, size } = ctx.query;
    const result = await momentService.getList(offset, size);

    // 2. 把列表数据返回前端
    ctx.body = {
      code: 0,
      message: "数据查询成功~",
      data: result,
    };
  }

  async getMoment(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.getMoment(momentId);

    ctx.body = {
      code: 0,
      message: "数据查询成功~",
      data: result,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;

    const { content } = ctx.request.body;

    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "数据修改成功~",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 0,
      message: "数据删除成功~",
      data: result,
    };
  }
}

module.exports = new MomentController();
