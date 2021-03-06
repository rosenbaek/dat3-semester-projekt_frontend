import { useState } from "react";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StockFacade from "../facades/StockFacade";

export default function AddStockComponent(props) {
	const initialTransaction = {
		stockSymbol: "",
		units: "",
		boughtPrice: "",
	};
	const [transaction, setTransaction] = useState(initialTransaction);
	const [error, setError] = useState();

	const handleChange = (event) => {
		setError();
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setTransaction({ ...transaction, [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		StockFacade.addTransaction(transaction).catch(async (err) => {
			const e = await err;
			setError(e.message);
			console.log(e.message);
		});

		setTransaction(initialTransaction);
		props.handleReload();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Paper
				variant="outlined"
				sx={{ padding: 2, marginBottom: 2, paddingTop: 1, borderRadius: 3 }}
			>
				<Typography variant="h5" paddingBottom="5px" textAlign="left">
					Add Stock
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={4} md>
						<TextField
							fullWidth
							id="stockSymbol"
							label="Symbol"
							value={transaction.stockSymbol}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4} md>
						<TextField
							fullWidth
							type="number"
							id="units"
							label="Units"
							value={transaction.units}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={4} md>
						<TextField
							fullWidth
							type="number"
							id="boughtPrice"
							label="Bought Price"
							value={transaction.boughtPrice}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} md>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							endIcon={<SendIcon />}
							sx={{ height: 56 }}
						>
							Send
						</Button>
					</Grid>
				</Grid>
				<Typography
					variant="h5"
					sx={{ color: "red", margin: 2, marginBottom: 0 }}
				>
					{error}
				</Typography>
			</Paper>
		</form>
	);
}
