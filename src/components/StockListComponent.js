import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import DeleteIcon from "@mui/icons-material/Delete";

var columns = [
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
		field: "BoughtPrice",
		flex: 1,
		minWidth: 100,
	},
	{
		field: "CurrentPrice",
		flex: 1,
		minWidth: 100,
	},
	{
		field: "Units",
		flex: 1,
		minWidth: 80,
	},
];

const StockListComponent = ({ data, group, reload, setSelected, selected }) => {
	const [rows, setRows] = useState();
	const [columnsData, setColumnsData] = useState(columns);

	useEffect(() => {
		if (data.length > 0) {
			setRows(rowsData(data));
		}
	}, [data]);

	const handleDeleteInline = (params) => {
		StockFacade.deleteTransactions([params.id], (res) => {
			reload();
		});
	};
	useEffect(() => {
		if (group === false) {
			setColumnsData([
				...columnsData,
				{
					field: "actions",
					type: "actions",
					width: 0,
					getActions: (params) => [
						<GridActionsCellItem
							icon={<DeleteIcon />}
							onClick={() => handleDeleteInline(params)}
							label="Delete"
						/>,
					],
				},
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [group]);

	var rowsData = (data) => {
		return data?.map((transaction) => {
			return {
				id: transaction.id,
				Symbol: transaction.stock.symbol,
				Name: transaction.stock.shortName,
				Units: transaction.units,
				BoughtPrice: transaction.boughtPrice,
				CurrentPrice: transaction.stock.regularMarketPrice,
			};
		});
	};

	return rows ? (
		<DataGrid
			autoHeight
			autoPageSize
			rows={rows}
			columns={columnsData}
			pageSize={10}
			rowsPerPageOptions={[10]}
			checkboxSelection
			onSelectionModelChange={(newSelectionModel) => {
				setSelected(newSelectionModel);
			}}
			selectionModel={selected}
			disableColumnMenu
		/>
	) : null;
};

export default StockListComponent;
