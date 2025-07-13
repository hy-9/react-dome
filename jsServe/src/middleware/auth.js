const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");
const {
	getErrorMsgRes,
	getErrorRes,
	getSucceedRes,
	getSucceedMsgRes,
} = require("../tool/response");

const auth = async (ctx, next) => {
	// 获取请求头 authorization ，解析 token 值
	const { authorization } = ctx.request.header;
	console.log({ authorization });

	let token;
	if (authorization) {
		token = authorization.replace("Bearer ", "");
		console.log({ token });
	} else {
		return (ctx.body = getErrorMsgRes(405, "令牌无效", null));
	}

	try {
		// 调用 jwt.verify 函数来验证一个 JWT 令牌，并将验证后的用户信息存储到上下文对象 ctx 的 state 属性中
		// token：这是之前从 HTTP 请求头部提取并处理过的 JWT 令牌
		// JWT_SECRET：这是一个密钥，用于验证 JWT 令牌的签名。这个密钥应该是保密的，并且只有授权的服务端才应该知道它。
		// user 中包含了 payload 的信息（id、username、role ......）
		const user = jwt.verify(token, JWT_SECRET);
		// jwt.verify 函数会返回一个对象，这个对象通常包含了在创建令牌时添加到载荷（payload）中的用户信息
		// 该中间件将验证后的用户数据直接返回给浏览器
		ctx.state.user = user;
		console.log({ user });

		ctx.body = getSucceedMsgRes("验证成功", {
			id: user.id,
			username: user.username,
		});
	} catch (err) {
		switch (err.name) {
			// jsonwebtoken 库抛出的一个特定错误，表示尝试验证的 JWT令牌已经过期
			case "TokenExpiredError":
				console.error("token已过期", err);
				// 统一提交错误管理
				// return ctx.app.emit("error", tokenExpiredError, ctx);
				return (ctx.body = getErrorMsgRes(405, "令牌过期", null));
			// JsonWebTokenError 是一个更广泛的错误类型，它涵盖了与 JWT 相关的各种错误情况
			case "JsonWebTokenError":
				console.error("无效的token", err);
				// 统一提交错误管理
				// return ctx.app.emit("error", invalidToken, ctx);
				return (ctx.body = getErrorMsgRes(405, "令牌无效", null));
			default:
				return (ctx.body = getErrorRes());
		}
	}

	await next();
};

module.exports = {
	auth,
};
