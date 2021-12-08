import { URL_STOCK_API, URL } from "../constants.js";
import Facade from "./Facade.js";

const handleHttpErrors = async (res) => {
	if (!res.ok) {
		const response = await res.json();
		if (response.message === "Token not valid (timed out?)") {
			Facade.logout();
		}
		return Promise.reject(response);
	}
	return await res.json();
};

const StockFacade = () => {
	const addTransaction = (transaction) => {
		const options = Facade.makeOptions("POST", true, transaction);
		return fetch(URL_STOCK_API, options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
			});
	};

	const addEditGroup = (group, callback) => {
		const options = Facade.makeOptions("POST", true, group);
		return fetch(URL_STOCK_API + "/group", options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
				return callback(res);
			});
	};

	const deleteGroup = (group, callback) => {
		const options = Facade.makeOptions("DELETE", true);
		return fetch(URL_STOCK_API + "/group/" + group.id, options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
				return callback(res);
			});
	};

	const deleteTransactions = (transactionIds, callback) => {
		const options = Facade.makeOptions("DELETE", true);
		return fetch(
			URL_STOCK_API + transactionIds.map((id) => "?ids=" + id),
			options
		)
			.then(handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
				return callback(res);
			});
	};

	const getUserData = (callback) => {
		const options = Facade.makeOptions("GET", true);
		return fetch(URL_STOCK_API, options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log("GetUserData API call ------->");
				return callback(res);
			});
	};

	const updateUserData = (body, callback) => {
		const options = Facade.makeOptions("PUT", true, body);
		return fetch(URL + "/api/user", options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log("UpdateUserData API call ------->");
				return callback(res);
			});
	};

	const getAllCurrencies = (callback) => {
		const options = Facade.makeOptions("GET", true);
		return fetch(URL_STOCK_API + "/currencies", options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log("getAllCurrencies API call ------->");
				return callback(res);
			});
	};

	const getAllHistoricalCurrencies = (baseCurrency, callback) => {
		const options = Facade.makeOptions("GET", true);
		return fetch(
			URL_STOCK_API + "/historical/currencies/" + baseCurrency,
			options
		)
			.then(handleHttpErrors)
			.then((res) => {
				console.log("getAllHistoricalCurrencies API call ------->");
				return callback(res);
			});
	};

	return {
		addTransaction,
		getUserData,
		addEditGroup,
		deleteGroup,
		deleteTransactions,
		updateUserData,
		getAllCurrencies,
		getAllHistoricalCurrencies,
	};
};

export default StockFacade();
