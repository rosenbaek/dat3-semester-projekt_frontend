import { useState } from "react";
import { TextField, Box, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StockFacade from "../facades/StockFacade";

export default function AddStockComponent() {
	const initialTransaction = {
		stockSymbol: "",
		currencyCode: "",
		units: "",
		boughtPrice: "",
	};
	const [transaction, setTransaction] = useState(initialTransaction);

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setTransaction({ ...transaction, [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		StockFacade.addTransaction(transaction);
		setTransaction(initialTransaction);
	};

	return (
		<>
			<Paper>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							"& > :not(style)": { m: 1, width: "25ch" },
						}}
					>
						<TextField
							id="stockSymbol"
							label="Symbol"
							value={transaction.stockSymbol}
							onChange={handleChange}
							required
						/>
						<TextField
							id="currencyCode"
							label="Currency"
							value={transaction.currencyCode}
							onChange={handleChange}
							required
						/>
						<TextField
							type="number"
							id="units"
							label="Units"
							value={transaction.units}
							onChange={handleChange}
							required
						/>
						<TextField
							type="number"
							id="boughtPrice"
							label="Bought Price"
							value={transaction.boughtPrice}
							onChange={handleChange}
							required
						/>
						<Button type="submit" variant="contained" endIcon={<SendIcon />}>
							Send
						</Button>
					</Box>
				</form>
			</Paper>
		</>
	);
}
