import { styled } from "@mui/material/styles";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box, Autocomplete, TextField } from "@mui/material";

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
		headerName: "Name",
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
		headerName: "Last 7 days",
		flex: 1,
		type: "number",
		minWidth: 100,
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "#0EC477" : "#F74769",
					color: "white",
					borderRadius: 3,
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
		headerName: "Last 14 days",
		minWidth: 100,
		type: "number",
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "#0EC477" : "#F74769",
					color: "white",
					borderRadius: 3,
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
		headerName: "Last Month",
		minWidth: 100,
		type: "number",
		renderCell: (params) => (
			<Box
				sx={{
					backgroundColor: params.value > 0 ? "#0EC477" : "#F74769",
					color: "white",
					borderRadius: 3,
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

const CurrenciesScreen = ({ user }) => {
	const [baseCurrency, setBaseCurrency] = useState("");
	const [rows, setRows] = useState([]);

	useEffect(() => {
		console.log(baseCurrency);
	});

	useEffect(() => {
		if (user) {
			if (baseCurrency === "") {
				setBaseCurrency({ code: user.defaultCurrency });
			} else {
				StockFacade.getAllHistoricalCurrencies(baseCurrency.code, (res) => {
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
		}
	}, [user, baseCurrency]);

	const calcPercent = (current, old) => {
		const dif = current - old;
		const percent = (dif / old) * 100;
		return percent;
	};

	return (
		<MainStyle>
			{user ? (
				<>
					<Box sx={{ display: "flex", alignItems: "flex-end" }}>
						<Box
							sx={{
								flex: 1,

								alignItems: "flex-start",
							}}
						>
							<Box sx={{ display: "flex" }}>
								<Typography variant="h3">Currencies</Typography>
							</Box>
						</Box>
						<Box sx={{ maxWidth: 200, flex: 1 }}>
							<Autocomplete
								options={rows.map((c) => c.Code)}
								disablePortal
								value={baseCurrency.code}
								onChange={(event, code) => {
									if (code !== null) {
										setBaseCurrency({ code });
									}
								}}
								sx={{ marginBottom: 1 }}
								renderInput={(params) => (
									<TextField
										{...params}
										id="defaultCurrency"
										label="Base Currency"
										InputProps={{
											...params.InputProps,
										}}
									/>
								)}
								required
							/>
						</Box>
					</Box>
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
				</>
			) : null}
		</MainStyle>
	);
};

export default CurrenciesScreen;
