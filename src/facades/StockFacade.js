import { URL_STOCK_API } from "../constants.js";
import Facade from "./Facade.js";

const StockFacade = () => {
	const addTransaction = (transaction) => {
		const options = Facade.makeOptions("POST", true, transaction);
		return fetch(URL_STOCK_API, options)
			.then(Facade.handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
			});
	};

	return {
		addTransaction,
	};
};

export default StockFacade();
