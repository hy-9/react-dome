const { getErrorMsgRes } = require("../tool/response");

const errorHandling = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		ctx.status = error.status || 500;
		ctx.body = getErrorMsgRes(
			error.status || 500,
			error.message || "服务器错误",
			"",
		);
		ctx.app.emit("error", error, ctx);
	}
};

module.exports = {
	errorHandling,
};
