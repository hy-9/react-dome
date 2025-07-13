// 导入 env 环境变量
const {
	MONGODB_HOST,
	MONGODB_PORT,
	MONGODB_USER,
	MONGODB_PWD,
	MONGODB_DB,
} = require("../config/config.default");
// 使用 Mongoose 连接数据库 MongoDB 的服务端
const mongoose = require("mongoose");

// 适应环境变量参数
// 开始连接数据库
mongoose
	.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`)
	.then(() => {
		console.log("-----------------数据库连接成功 ！-----------------");
	})
	.catch((err) => {
		console.error(
			"-----------------连接数据库失败 ！",
			err + "-----------------",
		);
	});

// 导出 mongoose（commonJS 语法）
module.exports = mongoose;
