import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";

export default [
	// 默认页面
	index("routes/logIn.tsx"),
	// 前缀
	...prefix("app", [
		// 布局， 有这个才可以用 Outlet 组件渲染子路由组件
		layout("routes/app.tsx", [
			// 子路由
			route("main", "routes/app/main.tsx"),
			route("detail", "routes/app/detail.tsx"),
		]),
	]),
	// layout("routes/app.tsx", [route("main", "routes/app/main.tsx")]),
] as RouteConfig;
