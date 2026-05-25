class API {
	constructor() {
		this.baseURL = "https://fakestoreapi.com/";
		this.headers = { 'Content-Type': 'application/json' };
	};

	_buildUrl(path = '') {
		// Robustly join baseURL and path
		return new URL(path, this.baseURL).toString();
	}

	async get(path = '') {
		const url = this._buildUrl(path);
		const response = await fetch(url, {
			method: 'GET',
			headers: this.headers,
		});
		const data = await response.json();
		return { data, status: response.status, headers: Object.fromEntries(response.headers.entries()) };
	};

	async post(path = '', body) {
		const url = this._buildUrl(path);
		const response = await fetch(url, {
			method: 'POST',
			headers: this.headers,
			body: typeof body === 'string' ? body : JSON.stringify(body),
		});
		const data = await response.json();
		return { data, status: response.status, headers: Object.fromEntries(response.headers.entries()) };
	}
}

const api = new API();

export default api;