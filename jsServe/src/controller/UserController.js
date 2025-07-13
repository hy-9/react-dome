const { log } = require("console");
const userService = require("../service/UserService");

const {
	getSucceedMsgRes,
	getErrorRes,
	getErrorMsgRes,
} = require("../tool/response");
const { getToken } = require("../tool/token");

class UserController {
	// 用户注册
	async register(ctx, next) {
		const user = ctx.request.body;
		if (!(user.username && user.password)) {
			ctx.body = getErrorRes();
			return;
		}
		if ((await userService.findUserByNmae(user.username)).length != 0) {
			ctx.body = getErrorMsgRes(409, "用户名已注册", null);
			return;
		}
		try {
			const res = await userService.createUser(user);
			ctx.body = getSucceedMsgRes("用户注册成功", {
				id: res._id,
				username: res.username,
				phone: res.phone,
				email: res.email,
				createdAt: res.createdAt,
				updatedAt: res.updatedAt,
				token: getToken({ id: res._id, username: res.username }),
			});
		} catch (error) {
			ctx.body = getErrorMsgRes(500, error.message, null);
		}
	}

	// 用户登录
	async login(ctx, next) {
		const { username, password } = ctx.request.body;
		const res = await userService.login(username, password);

		ctx.body =
			res.length > 0
				? getSucceedMsgRes("登录成功", {
						id: res[0]._id,
						username: res[0].username,
						phone: res.phone,
						email: res.email,
						createdAt: res[0].createdAt,
						updatedAt: res[0].updatedAt,
						token: getToken({
							id: res[0]._id,
							username: res[0].username,
						}),
					})
				: getErrorMsgRes(403, "用户名或密码错误", null);
	}

	async alterUser(ctx, next) {
		if (
			ctx.state.user.username != ctx.request.body.username &&
			(await userService.findUserByNmae(ctx.request.body.username))
				.length > 0
		) {
			return (ctx.body = getErrorMsgRes(409, "用户名已注册", null));
		}
		try {
			const res = await userService.alter(
				{
					_id: ctx.state.user.id,
					username: ctx.state.user.username,
				},
				ctx.request.body,
			);
			ctx.body = getSucceedMsgRes("修改成功", {
				id: res._id,
				username: res.username,
				phone: res.phone,
				email: res.email,
				createdAt: res.createdAt,
				updatedAt: res.updatedAt,
				token: getToken({
					id: res._id,
					username: res.username,
				}),
			});
		} catch (error) {
			return getErrorRes();
		}
	}

	async deleteUser(ctx, next) {
		const res = await userService.delete({ _id: ctx.state.user.id });
		console.log(res);
		if (res.deletedCount == 1) {
			ctx.body = getSucceedMsgRes("删除成功", null);
		} else {
			ctx.body = getErrorMsgRes(500, "删除失败", null);
		}
	}

	async getUserInfo(ctx, next) {
		const res = await userService.findUserById(ctx.query.id);
		if (res) {
			ctx.body = getSucceedMsgRes("获取成功", {
				id: res._id,
				username: res.username,
				phone: res.phone,
				email: res.email,
				createdAt: res.createdAt,
				updatedAt: res.updatedAt,
			});
		} else {
			ctx.body = getErrorMsgRes(404, "用户不存在", null);
		}
	}

	async getUsersList(ctx, next) {
		const res = await userService.findUserAll();
		const data = res.map((item) => {
			return {
				id: item._id,
				username: item.username,
				phone: item.phone,
				email: item.email,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
			};
		});
		ctx.body = getSucceedMsgRes("获取成功", data);
	}
}

// 导出 UserController 实例（其他模块可以通过 require 导入这个实例，并调用其方法）
module.exports = new UserController();
