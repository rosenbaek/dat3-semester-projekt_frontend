import { styled, useTheme } from "@mui/material/styles";
import {
	Card,
	Typography,
	Modal,
	TextField,
	useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import StockListComponent from "./StockListComponent";
import Button from "@mui/material/Button";
import StockFacade from "../facades/StockFacade";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "left",
	borderRadius: 16,
	height: 130,
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

export default function GroupView({
	group: groupInput,
	currency,
	user,
	reload,
}) {
	const [open, setOpen] = useState(false);
	const [group, setGroup] = useState(groupInput);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const setSelected = (newSelectionModel) => {
		setGroup({ ...group, transactionIds: newSelectionModel });
	};

	const theme = useTheme();
	const hiddenDown = useMediaQuery(theme.breakpoints.down("sm"));

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setGroup({ ...group, [id]: value });
	};
	const handleSave = () => {
		StockFacade.addEditGroup(group, (response) => {
			reload();
			handleClose();
		});
	};

	const handleDelete = () => {
		StockFacade.deleteGroup(group, (response) => {
			console.log(JSON.stringify(response));
			reload();
			handleClose();
		});
	};
	const saveNeeded = () => {
		if (
			JSON.stringify(groupInput.transactionIds) ===
				JSON.stringify(group.transactionIds) &&
			group.name === groupInput.name
		) {
			return true;
		} else {
			return false;
		}
	};

	const calcPercent = () => {
		const totalBoughtPrice = groupInput.value - groupInput.profLoss;
		if (totalBoughtPrice === 0.0) {
			return 0.0;
		}
		return (groupInput.profLoss / totalBoughtPrice) * 100;
	};
	return (
		<RootStyle theme={theme} sx={{ minWidth: hiddenDown ? 158 : 180 }}>
			<Box onClick={handleOpen}>
				<Box sx={{ display: "flex", marginBottom: 1 }}>
					<Box
						sx={{
							padding: 1.2,
							borderRadius: 3.5,

							backgroundColor: calcPercent() < 0 ? "#F74769" : "#0EC477",
							fontSize: 14,
							color: "white",
							fontWeight: 600,
						}}
					>
						{calcPercent().toFixed(2)} %
					</Box>
				</Box>

				<Typography variant="h6" sx={{ textTransform: "capitalize" }}>
					{groupInput.name}
				</Typography>
				<Typography>
					{groupInput.value.toFixed(2)} {currency.toUpperCase()}
				</Typography>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<TextField
							id="name"
							label="Name"
							value={group.name}
							onChange={handleChange}
							sx={{ marginBottom: 2 }}
						/>
						<Button
							variant="contained"
							sx={{ display: "flex", marginBottom: 2, height: 40 }}
							color="error"
							onClick={handleDelete}
							//Check if props.groups.length is != selectionModel to see if there has been any change
						>
							Delete Group
						</Button>
					</Box>

					<StockListComponent
						data={user.transactions}
						setSelected={setSelected}
						group={true}
						selected={group.transactionIds}
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
							sx={{ display: "flex", height: 40 }}
							disabled={saveNeeded()} //Check if props.groups.length is != selectionModel to see if there has been any change
							onClick={handleSave}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Modal>
		</RootStyle>
	);
}
