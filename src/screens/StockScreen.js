import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AddStockComponent from "../components/AddStockComponent";
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
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const StockScreen = () => {
	const [reload, setReload] = useState(true);

	const handleReload = () => {
		setReload(!reload);
	};

	useEffect(() => {
		console.log("test: " + reload);
	});
	return (
		<MainStyle>
			<AddStockComponent handleReload={handleReload} />
			<StockListComponent reload={reload} />
		</MainStyle>
	);
};

export default StockScreen;
