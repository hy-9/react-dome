module.exports = {
	getSucceedMsgRes(msg, data) {
		return { code: 2000, status: 200, msg: msg, data: data };
	},
	getSucceedRes() {
		return { code: 2000, status: 200, msg: "", data: {} };
	},
	getErrorMsgRes(code, msg, data) {
		return { code: 0, status: code, msg: msg, data: data | {} };
	},
	getErrorRes() {
		return { code: 0, status: 500, msg: "error", data: {} };
	},
};
