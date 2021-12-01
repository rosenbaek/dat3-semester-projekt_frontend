import { styled } from "@mui/material/styles";
import { Box, Grid, Container, Typography } from "@mui/material";
import GroupView from "../components/GroupComponent";
import StockListComponent from "../components/StockListComponent";
import TotalPortfolioComponent from "../components/TotalPortfolioComponent";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import NewsComponent from "../components/NewsComponent";
import AddIcon from "@mui/icons-material/Add";

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

const DashboardScreen = (props) => {
	const [user, setUser] = useState();
	console.log(props);
	const group = { name: "Enviromental", value: 15220.0 };

	useEffect(() => {
		StockFacade.getUserData((user) => {
			setUser(user);
		});
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(user));
	});
	return (
		<MainStyle>
			{user ? (
				<Container maxWidth="xl">
					<Box sx={{ py: 5, textAlign: "left" }}>
						<Typography variant="h5">Hi, Welcome back</Typography>
					</Box>
					<Typography variant="h5" sx={{ textAlign: "left" }}>
						Groups
					</Typography>
					<Box sx={{ display: "flex", marginY: 3 }}>
						<Box
							onClick={() => alert("h")}
							sx={{
								backgroundColor: "red",
								height: 150,
								width: 200,
								flexShrink: 0,
								borderRadius: 4,
								marginRight: 3,
								display: "flex",
								backgroundColor: "#5924D0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								":hover": {
									backgroundColor: "#6E3CE4",
								},
							}}
						>
							<AddIcon sx={{ color: "white", fontSize: 50 }} />
						</Box>

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
										group={group}
										currency={user.defaultCurrency}
										user={user}
									/>
								);
							})}
							{user.groups.map((group) => {
								return (
									<GroupView
										group={group}
										currency={user.defaultCurrency}
										user={user}
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
							<StockListComponent data={user.transactions} />
						</Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={8}></Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={4}></Grid>

						<Grid item xs={12} md={6} lg={8}></Grid>
					</Grid>
				</Container>
			) : null}
		</MainStyle>
	);
};

export default DashboardScreen;
