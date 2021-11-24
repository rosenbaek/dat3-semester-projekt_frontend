import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";

const columns = [
	{
		field: "Symbol",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "Name",
		flex: 1,
		minWidth: 140,
	},
	{
		field: "Units",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "BoughtPrice",
		flex: 1,
		minWidth: 100,
	},
	{
		field: "Currency",
		flex: 0,
		minWidth: 80,
	},
];

const StockListComponent = () => {
	const [data, setData] = useState();

	useEffect(() => {
		StockFacade.getUserData((res) => {
			setData(res.transactions);
		});
	}, []);

	var rows = () => {
		return data?.map((transaction) => {
			console.log(transaction);
			return {
				id: transaction.id,
				Symbol: transaction.stock.symbol,
				Name: transaction.stock.shortName,
				Units: transaction.units,
				BoughtPrice: transaction.boughtPrice,
				Currency: transaction.currency.code,
			};
		});
	};

	return (
		<DataGrid
			autoHeight
			autoPageSize
			rows={rows()}
			columns={columns}
			pageSize={10}
			rowsPerPageOptions={[10]}
			checkboxSelection
			disableColumnMenu
		/>
	);
};

export default StockListComponent;
