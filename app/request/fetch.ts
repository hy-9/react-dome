class FetchTool {
	private BASE_URL: string;
	private TIME_OUT: number;
	constructor() {
		this.BASE_URL = 'http://localhost:3000/api/';
		this.TIME_OUT = 5000;
	}
	async fetch<T>(url: string, options?: RequestInit): Promise<T> {
		const controller = new AbortController();
		const signal = controller.signal;

		// 创建一个超时的 Promise
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new Error("timeout"));
				// 停止signal请求
				controller.abort();
			}, this.TIME_OUT);
		});

		try {
			const res = (await Promise.race([
				fetch(url, { ...options, signal }),
				timeoutPromise,
			])) as Response;
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json() as Promise<T>;
		} catch (error) {
			if (error instanceof Error) {
				console.log("请求失败:", error.message);
			} else {
				console.log("未知错误:", error);
			}
			throw error;
		}
	}

	async request<T>(options: {
		url: string;
		method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD";
		data?: any;
		header?: any;
	}): Promise<T> {
		let url = this.BASE_URL + options.url;
		let req: RequestInit = this.forwardInterception({ ...options });
		return await this.fetch(url, req);
	}

	forwardInterception(options: {
		method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD";
		data?: any;
		header?: any;
	}): RequestInit {
		let req = {
			method: options.method || "GET",
			headers: {
				"Content-Type": "application/json",
				...options.header,
			},
			body: options.data ? JSON.stringify(options.data) : null,
		};
		const token = localStorage.getItem("token");
		if (token) {
			req.headers = {
				...req.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return req;
	}
	async laterInterception<T>(options: {
		url: string;
		method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD";
		data?: any;
		header?: any;
	},fun:Function): Promise<T> {
		let res = await this.request<T>(options)
		return fun(res);
	}
}
const fetchTool = new FetchTool();
export default fetchTool;