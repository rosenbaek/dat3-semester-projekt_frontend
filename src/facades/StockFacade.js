import { URL_STOCK_API } from "../constants.js";
import Facade from "./Facade.js";

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject(res.json());
	}
	return res.json();
}

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
