const router = require("koa-router")();
// 并从该模块中提取 register 和 login 这两个方法或属性，然后将它们分别赋值给当前文件中的 register 和 login 常量。
const {
	register,
	login,
	alterUser,
	deleteUser,
	getUserInfo,
	getUsersList,
} = require("../controller/UserController");
const { auth } = require("../middleware/auth");
const { errorHandling } = require("../middleware/errorHandling");
const { getSucceedMsgRes } = require("../tool/response");

router.prefix("/users");

router.get("/", errorHandling, getUserInfo);
router.get("/list", errorHandling, getUsersList);
router.post("/register", errorHandling, register);
router.post("/login", errorHandling, login);
router.put("/alter", errorHandling, auth, alterUser);
router.delete("/delete", errorHandling, auth, deleteUser);

module.exports = router;
