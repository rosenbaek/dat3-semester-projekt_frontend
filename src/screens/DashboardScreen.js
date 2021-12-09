import { styled } from "@mui/material/styles";
import {
	Box,
	Grid,
	Container,
	Typography,
	Button,
	Modal,
	TextField,
} from "@mui/material";
import GroupView from "../components/GroupComponent";
import StockListComponent from "../components/StockListComponent";
import TotalPortfolioComponent from "../components/TotalPortfolioComponent";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import NewsComponent from "../components/NewsComponent";
import AddIcon from "@mui/icons-material/Add";
import HideComponent from "../components/utility/HideComponent";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	height: "100vh",
	backgroundColor: "#ECEEF2",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	maxWidth: 900,
	maxHeight: "80%",
	bgcolor: "white",
	borderRadius: 4,
	boxShadow: 24,
	p: 2,
};
const DashboardScreen = (props) => {
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);
	const [group, setGroup] = useState({ name: "", transactionIds: [] });
	const [selectionModel, setSelectionModel] = useState([]);

	useEffect(() => {
		StockFacade.getUserData((user) => {
			setUser(user);
		});
	}, []);

	const setSelectedInGroup = (newSelectionModel) => {
		setGroup({ ...group, transactionIds: newSelectionModel });
	};

	const setSelected = (newSelectionModel) => {
		setSelectionModel(newSelectionModel);
	};

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setGroup({ ...group, [id]: value });
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setGroup({ name: "", transactionIds: [] });
	};

	const handleReload = () => {
		const timer = setTimeout(() => {
			StockFacade.getUserData((user) => {
				setUser(user);
			});
		}, 300);
		return () => clearTimeout(timer);
	};

	const handleSave = () => {
		StockFacade.addEditGroup(group, (response) => {
			console.log(JSON.stringify(response));
			handleReload();
			handleClose();
		});
	};

	const saveNeeded = () => {
		if (group.transactionIds.length === 0 || group.name === "") {
			return true;
		} else {
			return false;
		}
	};
	return (
		<MainStyle>
			{user ? (
				<Container maxWidth="xl">
					<Box sx={{ py: 3, textAlign: "left" }}>
						<Typography variant="h5" sx={{ textTransform: "capitalize" }}>
							Hi, Welcome back {user.username}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Typography variant="h5" sx={{ textAlign: "left" }}>
							Groups
						</Typography>
						<HideComponent width="smUp">
							<Box
								onClick={handleOpen}
								sx={{
									height: 30,
									width: 40,
									flexShrink: 0,
									borderRadius: 1,
									marginLeft: 2,
									display: "flex",
									backgroundColor: "#4B4BAC",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									":hover": {
										backgroundColor: "#44449B",
									},
								}}
							>
								<AddIcon sx={{ color: "white", fontSize: 20 }} />
							</Box>
						</HideComponent>
					</Box>

					<Box sx={{ display: "flex", marginBottom: 3, marginTop: 1 }}>
						<HideComponent width="smDown">
							<Box
								onClick={handleOpen}
								sx={{
									height: 130,
									width: 180,
									flexShrink: 0,
									borderRadius: 4,
									marginRight: 3,
									display: "flex",
									backgroundColor: "#4B4BAC",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									":hover": {
										backgroundColor: "#44449B",
									},
								}}
							>
								<AddIcon sx={{ color: "white", fontSize: 50 }} />
							</Box>
						</HideComponent>

						<Box
							sx={{
								display: "flex",
								width: "100%",
								overflowX: "scroll",
								scrollbarWidth: "none",

								borderRadius: 5,
								"&::-webkit-scrollbar": {
									display: "none",
								},
							}}
						>
							{user.groups.map((group) => {
								return (
									<GroupView
										key={group.id}
										group={group}
										currency={user.defaultCurrency}
										user={user}
										reload={handleReload}
									/>
								);
							})}
						</Box>
					</Box>

					<Grid container spacing={3}>
						<Grid item xs={12} md={7} lg={7}>
							<TotalPortfolioComponent
								user={user}
								currency={user.defaultCurrency}
							/>
						</Grid>

						<Grid item xs={12} md={5} lg={5}>
							<NewsComponent news={user.news} />
						</Grid>

						<Grid item xs={12} md={12} lg={12}>
							<StockListComponent
								data={user.transactions}
								group={false}
								setSelected={setSelected}
								selected={selectionModel}
								reload={handleReload}
							/>
						</Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={8}></Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={8}></Grid>
					</Grid>
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
									required
								/>
							</Box>

							<StockListComponent
								data={user.transactions}
								setSelected={setSelectedInGroup}
								group={true}
								selected={group.transactionIds}
							/>
							<Box
								sx={{
									display: "flex",

									justifyContent: "flex-end",
									marginTop: 2,
								}}
							>
								<Button
									variant="outlined"
									sx={{
										display: "flex",
										marginBottom: 2,
										height: 40,
										marginRight: 2,
									}}
									onClick={handleClose}
									color="error"
									//Check if props.groups.length is != selectionModel to see if there has been any change
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									sx={{ display: "flex", height: 40 }}
									disabled={saveNeeded()}
									onClick={handleSave}
									//Check if props.groups.length is != selectionModel to see if there has been any change
								>
									Save
								</Button>
							</Box>
						</Box>
					</Modal>
				</Container>
			) : null}
		</MainStyle>
	);
};

export default DashboardScreen;
