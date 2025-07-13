// 导入 jsonwebtoken
const jwt = require("jsonwebtoken");
// 导入 jwt 秘钥
const { JWT_SECRET } = require("../config/config.default");
module.exports = {
	getToken(data) {
		return jwt.sign(data, JWT_SECRET, {
			// 一天有效期
			expiresIn: "1d",
		});
	},
};
