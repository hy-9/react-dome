// 数据模型（规范数据格式）
const { Schema } = require("mongoose");
// 导入数据库连接对象
const mongoose = require("../db/mongodb");

// 定义 Schema
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true, // 必填
			unique: true, // 唯一，不重复
		},
		password: {
			type: String,
			required: true, // 必填
			validate: {
				validator: function (v) {
					return /^[a-zA-Z0-9_-]{6,18}$/.test(v);
				},
				message: "密码需为6至18位",
			},
		},
		age: Number,
		phone: {
			type: String,
			required: false,
			validate: {
				validator: function (v) {
					// 这里使用正则表达式来验证手机号格式
					// 假设你的手机号格式是11位数字
					return /^\d{11}$/.test(v);
				},
				message: "手机号格式不正确，请输入11位数字",
			},
		},
		email: {
			type: String,
			required: false,
			validate: {
				validator: function (v) {
					// 这里使用正则表达式来验证邮箱格式
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
						v,
					);
				},
				message: "邮箱格式不正确",
			},
		},
	},
	{
		timestamps: true, // 时间戳，自动添加文档的创建时间和更新时间
	},
);

// 创建模型
const User = mongoose.model("User", UserSchema);

// 导出 User 对象
module.exports = User;
