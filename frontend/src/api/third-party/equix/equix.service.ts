import {
	EquixAccount,
	EquixCosDepthPrice,
	EquixExchange,
	EquixNews,
	EquixOrder,
	EquixPortfolio,
	EquixResPageData,
	EquixSymbol,
	EquixSymbolInfo,
	EquixToken,
} from "./equix.types";

export const EQUIX_BASE_URL = "https://equix-uat-retail-api.equix.app/v1/";

export const equixLogin = async ({ data = {} as { username?: string; password?: string } } = {}): Promise<EquixToken> => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Accept", "*/*");
	myHeaders.append("Environment", "equix");

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		// redirect: 'follow',
		body: JSON.stringify({
			data: {
				...(data ?? {}),
				provider: "quantedge",
				storage_token: true,
			},
		}),
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}auth`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetSymbolInfo = async ({ symbol = "ANZ", token = "" }): Promise<EquixSymbolInfo> => {
	const myHeaders = new Headers();
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}market-info/symbol/${symbol}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetAllAccounts = async ({
	user_id = "eq1691568704225",
	page_id = 1,
	page_size = 30,
	token = "",
}): Promise<EquixResPageData<EquixAccount>> => {
	const myHeaders = new Headers();
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}user/account/inquery?user_id=${user_id}&page_id=${page_id}&page_size=${page_size}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetAccountInfo = ({ account_id = "105536", token = "" }): Promise<EquixAccount> => {
	const myHeaders = new Headers();
	myHeaders.append("accept", "application/json");
	myHeaders.append("environment", "equix");
	myHeaders.append("Referer", "");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}user/account?account_id=${account_id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data?.[0] ?? data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetPortfolio = ({ account_id = "105536", token = "" }): Promise<EquixPortfolio> => {
	const myHeaders = new Headers();
	myHeaders.append("accept", "application/json");
	myHeaders.append("environment", "equix");
	myHeaders.append("Referer", "");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}portfolio/total/${account_id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetCosDepthPrice = ({
	exchange = EquixExchange.ASX,
	symbol = EquixSymbol.ANZ,
	token = "",
}): Promise<Array<EquixCosDepthPrice>> => {
	const myHeaders = new Headers();
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}feed-snapshot-aio/price/${exchange}/${symbol}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetAllOrders = ({
	account_id = "105536",
	from_time = 1691935200000,
	to_time = 1692021599999,
	page_id = 1,
	page_size = 50,
	token = "",
}): Promise<EquixResPageData<EquixOrder>> => {
	const myHeaders = new Headers();
	myHeaders.append("authority", "equix-uat-advisor-api.equix.app");
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("environment", "equix");
	myHeaders.append("origin", "https://uat.equix.app");
	myHeaders.append("referer", "https://uat.equix.app/");

	const raw = JSON.stringify({
		query: {
			bool: {
				must: [
					{
						bool: {
							should: [
								{
									term: {
										order_tag: {
											value: "open",
										},
									},
								},
								{
									term: {
										order_tag: {
											value: "stoploss",
										},
									},
								},
								{
									bool: {
										must: [
											{
												term: {
													order_tag: {
														value: "filled",
													},
												},
											},
											{
												range: {
													updated: {
														from: from_time,
														to: to_time,
													},
												},
											},
										],
									},
								},
								{
									bool: {
										must: [
											{
												term: {
													order_tag: {
														value: "cancelled",
													},
												},
											},
											{
												range: {
													updated: {
														from: from_time,
														to: to_time,
													},
												},
											},
										],
									},
								},
							],
						},
					},
					{
						term: {
							"account_id.keyword": {
								value: account_id,
							},
						},
					},
					{
						script: {
							script:
								"if(doc['origin_broker_order_id.keyword'].size()!=0)doc['origin_broker_order_id.keyword'].value==doc['broker_order_id.keyword'].value",
						},
					},
				],
			},
		},
		sort: [
			{
				updated: "desc",
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}search/order?page_id=${page_id}&page_size=${page_size}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetWorkingOrders = ({ account_id = "105536", page_id = 1, page_size = 50, token = "" }): Promise<Array<EquixOrder>> => {
	const myHeaders = new Headers();
	myHeaders.append("authority", "equix-uat-advisor-api.equix.app");
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("environment", "equix");
	myHeaders.append("origin", "https://uat.equix.app");
	myHeaders.append("referer", "https://uat.equix.app/");

	const raw = JSON.stringify({
		query: {
			bool: {
				must: [
					{
						bool: {
							should: [
								{
									term: {
										order_tag: {
											value: "open",
										},
									},
								},
							],
						},
					},
					{
						term: {
							"account_id.keyword": {
								value: account_id,
							},
						},
					},
					{
						script: {
							script:
								"if(doc['origin_broker_order_id.keyword'].size()!=0)doc['origin_broker_order_id.keyword'].value==doc['broker_order_id.keyword'].value",
						},
					},
				],
			},
		},
		sort: [
			{
				updated: "desc",
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}search/order?page_id=${page_id}&page_size=${page_size}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetOrder = ({ order_id = "4ac6b2c8117049dd80e0a29831ee4af7", token = "" }): Promise<EquixOrder> => {
	const myHeaders = new Headers();
	myHeaders.append("environment", "equix");
	myHeaders.append("Referer", "");
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}order?order_id=${order_id}&detail=true`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};

export const equixGetMarketNews = ({
	from_time = "1691416800000",
	to_time = "1692021599999",
	page_id = 1,
	page_size = 50,
	token = "",
}): Promise<EquixResPageData<EquixNews>> => {
	const myHeaders = new Headers();
	myHeaders.append("authority", "equix-uat-advisor-api.equix.app");
	myHeaders.append("accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("environment", "equix");
	myHeaders.append("origin", "https://uat.equix.app");
	myHeaders.append("referer", "https://uat.equix.app/");

	const raw = JSON.stringify({
		query: {
			bool: {
				must: [
					{
						range: {
							updated: {
								from: from_time,
								to: to_time,
							},
						},
					},
				],
			},
		},
		sort: [
			{
				updated: {
					order: "desc",
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	};

	return new Promise((resolve, reject) => {
		fetch(`${EQUIX_BASE_URL}search/news?page_id=${page_id}&page_size=${page_size}`, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
};
