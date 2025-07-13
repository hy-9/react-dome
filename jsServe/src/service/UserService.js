// 导入 User 模型
const User = require("../model/User");

/**
 * 用户信息 Service
 * @author arry老师
 * @version V1.0
 */
class UserService {
	/**
	 * 用户注册注册
	 * @param {*} user
	 * @returns
	 */
	async createUser(user) {
		// 创建用户
		return await User.create(user);
	}

	/**
	 * 查找用户
	 * @param {*} username
	 * @returns
	 */
	async findUserByNmae(username) {
		return await User.find({ username });
	}

	/**
	 * 登录
	 * @param {*} username
	 * @param {*} password
	 * @returns
	 */
	async login(username, password) {
		return await User.find({ username, password });
	}
	async alter(alterObj, updateObj) {
		return await User.findByIdAndUpdate(alterObj, updateObj, { new: true });
	}

	async delete(obj) {
		return await User.deleteOne(obj);
	}

	async findUserById(id) {
		return User.findById(id);
	}

	async findUserAll() {
		return User.find();
	}
}

module.exports = new UserService();
