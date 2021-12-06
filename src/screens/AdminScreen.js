import { styled } from "@mui/material/styles";

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

const AdminScreen = (props) => {
	return (
		<MainStyle>
			{props.user && props.user.roles.includes("admin") ? (
				<h2 className="header">AdminScreen</h2>
			) : (
				<h2 className="header">You are not allowed here!</h2>
			)}
		</MainStyle>
	);
};

export default AdminScreen;
