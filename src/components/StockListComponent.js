import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import DeleteIcon from "@mui/icons-material/Delete";

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
	{
		field: "actions",
		type: "actions",
		width: 50,
		getActions: (params) => [
			<GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
		],
	},
];

const StockListComponent = (props) => {
	const [rows, setRows] = useState();

	useEffect(() => {
		StockFacade.getUserData((res) => {
			setRows(rowsData(res.transactions));
		});
	}, []);

	useEffect(() => {
		//Timeout to make sure backend is updated before fetching
		const timer = setTimeout(() => {
			StockFacade.getUserData((res) => {
				setRows(rowsData(res.transactions));
			});
		}, 1000);
		return () => clearTimeout(timer);
	}, [props.reload]);

	var rowsData = (data) => {
		return data?.map((transaction) => {
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
			rows={rows}
			columns={columns}
			pageSize={10}
			rowsPerPageOptions={[10]}
			checkboxSelection
			disableColumnMenu
		/>
	);
};

export default StockListComponent;
