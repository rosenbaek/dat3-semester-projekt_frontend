import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AddStockComponent from "../components/AddStockComponent";
import StockListComponent from "../components/StockListComponent";
import { Box } from "@mui/material";
import StockFacade from "../facades/StockFacade";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	height: "100vh",
	margin: 2,
	backgroundColor: "#ECEEF2",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const StockScreen = () => {
	const [data, setData] = useState(true);
	const [selectionModel, setSelectionModel] = useState([]);

	const handleReload = () => {
		const timer = setTimeout(() => {
			StockFacade.getUserData((res) => {
				setData(res.transactions);
			});
		}, 500);
		return () => clearTimeout(timer);
	};

	const setSelected = (newSelectionModel) => {
		setSelectionModel(newSelectionModel);
	};

	useEffect(() => {
		//Timeout to make sure backend is updated before fetching
		const timer = setTimeout(() => {
			StockFacade.getUserData((res) => {
				setData(res.transactions);
			});
		}, 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<MainStyle>
			<Box sx={{ marginLeft: 2, marginRight: 2 }}>
				<AddStockComponent handleReload={handleReload} />
				<StockListComponent
					data={data}
					group={false}
					setSelected={setSelected}
					selected={selectionModel}
					reload={handleReload}
				/>
			</Box>
		</MainStyle>
	);
};

export default StockScreen;
