import { URL_STOCK_API } from "../constants.js";
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

	const getUserData = (callback) => {
		const options = Facade.makeOptions("GET", true);
		return fetch(URL_STOCK_API, options)
			.then(handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	return {
		addTransaction,
		getUserData,
	};
};

export default StockFacade();
