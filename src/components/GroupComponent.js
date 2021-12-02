import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import StockListComponent from "./StockListComponent";
import AddStockComponent from "./AddStockComponent";
import Button from "@mui/material/Button";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "left",
	borderRadius: 16,
	height: 150,
	width: 200,

	marginRight: 25,
	padding: theme.spacing(1.5, 1.5),
	color: "rgb(0, 82, 73)",
	backgroundColor: "#FFFFFF",
	flexShrink: 0,

	cursor: "pointer",
	":hover": {
		backgroundColor: "#FAFAFA",
	},
}));

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	maxWidth: 900,
	bgcolor: "white",
	border: "1px solid #ebebeb",
	borderRadius: 4,
	boxShadow: 24,
	p: 2,
};

export default function GroupView({ group, currency, user }) {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const theme = useTheme();

	useEffect(() => {
		setData(
			user.transactions.filter((t) => group.transactionIds.includes(t.id))
		);
	}, [user]);
	return (
		<RootStyle theme={theme}>
			<Box onClick={handleOpen}>
				<Box
					sx={{
						height: 35,
						width: 65,
						borderRadius: 3.5,
						marginBottom: 2,
						backgroundColor: "red",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 14,
						color: "white",
						fontWeight: 600,
					}}
				>
					+1.32%
				</Box>
				<Typography variant="h6">{group.name}</Typography>
				<Typography>
					{group.value.toFixed(2)}
					{currency.toUpperCase()}
				</Typography>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h4"
						component="h2"
						sx={{ py: 2 }}
					>
						{group.name}
					</Typography>

					<StockListComponent
						data={user.transactions}
						group={group.transactionIds}
					/>
					<Box
						sx={{
							display: "flex",

							justifyContent: "flex-end",
							marginTop: 3,
						}}
					>
						<Button
							variant="contained"
							sx={{ display: "flex" }}
							disabled={false} //Check if props.groups.length is != selectionModel to see if there has been any change
						>
							Save
						</Button>
					</Box>
				</Box>
			</Modal>
		</RootStyle>
	);
}
