import { Outlet } from "react-router";

export default function App() {
	return (
		<div className="h-full w-full">
			<div className="flex h-12 w-full bg-gray-100">
				<div className="h-full flex-1 bg-amber-200"></div>
				<div className="mx-2 flex h-full w-20 items-center justify-center bg-sky-300">
					<a href="/">登录</a>
				</div>
			</div>
			<div className="flex h-[calc(100vh-calc(var(--spacing)*12))] w-full bg-green-100">
				<div className="h-full w-24 bg-fuchsia-300">
					<nav className="flex h-full w-24 flex-col">
						<a
							href="/app/main"
							className="flex h-14 items-center px-4 text-gray-500 hover:bg-gray-200">
							主页
						</a>
						<a
							href="/app/detail"
							className="flex h-14 items-center px-4 text-gray-500 hover:bg-gray-200">
							详情
						</a>
					</nav>
				</div>
				<div className="h-full flex-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
}	
