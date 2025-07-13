const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");

const routers = [require("./src/routes/user")];
// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"],
	}),
);
app.use(json());
app.use(logger());
app.use(
	cors({
		origin: function (ctx) {
			return "*";
		},
		maxAge: 5,
		credentials: true, // 是否允许发送Cookie
	}),
);
app.use(require("koa-static")(__dirname + "/public"));

app.use(
	views(__dirname + "/views", {
		extension: "pug",
	}),
);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
routers.forEach((router) => {
	router.prefix("/api");
	app.use(router.routes(), router.allowedMethods());
});

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
