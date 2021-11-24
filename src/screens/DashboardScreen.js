import { Table } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { Box, Grid, Container, Typography } from "@mui/material";
import GroupView from "../components/GroupComponent";
import StockListComponent from "../components/StockListComponent";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const Home = (props) => {
	console.log(props);
	const group = { name: "testGroup", value: 15220 };
	return (
		<MainStyle>
			<Container maxWidth="xl">
				<Box sx={{ pb: 5, textAlign: "left" }}>
					<Typography variant="h5">Hi, Welcome back</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={6} sm={6} md={3}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>
					<Grid item xs={6} sm={6} md={3}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>
					<Grid item xs={6} sm={6} md={3}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>
					<Grid item xs={6} sm={6} md={3}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>

					<Grid item xs={12} md={7} lg={7}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>

					<Grid item xs={12} md={5} lg={5}>
						<GroupView group={group} currency={"DKK"} />
					</Grid>

					<Grid item xs={12} md={12} lg={12}>
						<StockListComponent />
					</Grid>

					<Grid item xs={12} md={6} lg={4}></Grid>

					<Grid item xs={12} md={6} lg={8}></Grid>

					<Grid item xs={12} md={6} lg={4}></Grid>

					<Grid item xs={12} md={6} lg={4}></Grid>

					<Grid item xs={12} md={6} lg={8}></Grid>
				</Grid>
			</Container>
		</MainStyle>
	);
};

export default Home;
