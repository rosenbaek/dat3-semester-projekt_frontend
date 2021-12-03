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

const StockListComponent = (props) => {
	const [rows, setRows] = useState();
	const [selectionModel, setSelectionModel] = useState([]);
	const [columnsData, setColumnsData] = useState(columns);

	useEffect(() => {
		if (props.data.length > 0) {
			setRows(rowsData(props.data));
			if (props.group !== null) {
				setSelectionModel(props.group);
			}
		}
	}, [props.data]);

	useEffect(() => {
		if (props.group === false) {
			console.log(props.group);
			setColumnsData([
				...columnsData,
				{
					field: "actions",
					type: "actions",
					width: 0,
					getActions: (params) => [
						<GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
					],
				},
			]);
		}
	}, [props.group]);

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
				props.setSelected(newSelectionModel);
			}}
			selectionModel={props.selected}
			disableColumnMenu
		/>
	) : null;
};

export default StockListComponent;
