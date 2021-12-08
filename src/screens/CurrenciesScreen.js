import { styled } from "@mui/material/styles";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box } from "@mui/material";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

var columns = [
	{
		field: "Code",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "name",
		flex: 1,
		minWidth: 140,
	},
	{
		field: "Current",
		flex: 1,
		type: "number",
		minWidth: 100,
	},
	{
		field: "Day7",
		flex: 1,
		type: "number",
		minWidth: 100,
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "green" : "red",
					color: "white",
					borderRadius: 5,
					padding: 1,
					height: 35,
					display: "flex",
					minWidth: 70,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{params.value + "%"}
			</Box>
		),
	},
	{
		field: "Day14",
		flex: 1,
		minWidth: 100,
		type: "number",
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "green" : "red",
					color: "white",
					borderRadius: 5,
					padding: 1,
					height: 35,
					display: "flex",
					minWidth: 70,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{params.value + "%"}
			</Box>
		),
	},
	{
		field: "LastMonth",
		flex: 1,
		minWidth: 100,
		type: "number",
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "green" : "red",
					color: "white",
					borderRadius: 5,
					padding: 1,
					height: 35,
					display: "flex",
					minWidth: 70,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{params.value + "%"}
			</Box>
		),
	},
];
const Test = (val) => {
	return <Typography sx={{ backgroundColor: "red" }}>{val}</Typography>;
};
const CurrenciesScreen = ({ user }) => {
	const [rows, setRows] = useState([
		{
			id: 1,
			Code: "yer",
			Name: "Yemeni rial",
			Value: 0.0,
		},
		{
			id: 2,
			Code: "zar",
			Name: "South African rand",
			Value: 15.959,
		},
	]);

	useEffect(() => {
		if (user) {
			StockFacade.getAllHistoricalCurrencies(user.defaultCurrency, (res) => {
				setRows(
					res.map((c, index) => {
						c.id = index;
						c.Code = c.code.toUpperCase();
						c.Current = c.value.toFixed(2);
						c.LastMonth = calcPercent(c.value, c.lastMonth).toFixed(2);
						c.Day7 = calcPercent(c.value, c.day7).toFixed(2);
						c.Day14 = calcPercent(c.value, c.day14).toFixed(2);

						return c;
					})
				);
			});
		}
	}, [user]);

	const calcPercent = (current, old) => {
		const dif = current - old;
		const percent = (dif / old) * 100;
		return percent;
	};

	return (
		<MainStyle>
			<h2>Currencies</h2>
			<h6>Base Currency: {user && user.defaultCurrency.toUpperCase()}</h6>
			{rows ? (
				<DataGrid
					autoHeight
					autoPageSize
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					disableColumnMenu
				/>
			) : null}
		</MainStyle>
	);
};

export default CurrenciesScreen;
