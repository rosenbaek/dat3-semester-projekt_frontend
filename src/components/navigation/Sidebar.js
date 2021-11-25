import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
	Box,
	Link,
	Typography,
	List,
	Drawer as Drawer1,
	Avatar,
	useTheme,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	IconButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import HideComponent from "../utility/HideComponent";
import MenuValues from "./MenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_MINI = 70;

const openedMixin = (theme) => ({
	width: DRAWER_WIDTH,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: DRAWER_WIDTH,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

// ----------------------------------------------------------------------

Sidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar, user }) {
	const { pathname } = useLocation();
	const theme = useTheme();

	const RootStyle = styled("div")(({ theme }) => ({
		[theme.breakpoints.up("lg")]: {
			flexShrink: 1,
			width: isOpenSidebar ? DRAWER_WIDTH : DRAWER_WIDTH_MINI,
		},
	}));

	const AccountStyle = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		padding: isOpenSidebar ? theme.spacing(2, 2) : theme.spacing(2, 0),
		borderRadius: 10,
		backgroundColor: isOpenSidebar ? theme.palette.grey[200] : null,
	}));

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<>
			<Box sx={{ py: 2 }}>
				<Box onClick={onCloseSidebar}>
					<IconButton
						onClick={onCloseSidebar}
						sx={
							isOpenSidebar
								? {
										float: "right",
										marginRight: 2,
								  }
								: {}
						}
					>
						{isOpenSidebar ? <ChevronLeftIcon /> : <Icon icon={menu2Fill} />}
					</IconButton>
				</Box>
			</Box>

			<Box sx={{ mb: 5, mx: 2 }}>
				<Link underline="none" component={RouterLink} to="/">
					<AccountStyle>
						<Avatar
							src={"static/mock-images/avatars/avatar_default.jpg"}
							alt="photoURL"
						/>
						<Box sx={{ ml: 2 }}>
							<Typography
								sx={{ color: "text.primary", textTransform: "capitalize" }}
							>
								{user ? user.username : "not logged in"}
							</Typography>
						</Box>
					</AccountStyle>
				</Link>
			</Box>
			<Box>
				<List disablePadding>
					{MenuValues.map((menu) => {
						if (user && menu.auth.some((item) => user.roles.includes(item))) {
							return (
								<ListItemButton
									key={menu.titel}
									component={RouterLink}
									to={menu.path}
									sx={{
										height: 48,
										color: "grey",
										mx: 2,
										mb: 1,
										borderRadius: 3,
										textTransform: "capitalize",
										paddingLeft: isOpenSidebar
											? theme.spacing(2.5)
											: theme.spacing(1),
										paddingRight: theme.spacing(2.5),

										"&:hover": {
											color: "black",
											backgroundColor: "#eeeeee",
										},
										...(pathname === menu.path && {
											color: "#00AB55",
											fontWeight: "fontWeightMedium",
											bgcolor: "rgba(0,171,85,0.1)",
											"&:before": { display: "block" },
											"&:hover": {
												color: "#00AB55",
												backgroundColor: "#eeeeee",
											},
										}),
									}}
								>
									<ListItemIcon
										sx={{
											...(pathname === menu.path && {
												color: "#00AB55",
											}),
										}}
									>
										{menu.icon}
									</ListItemIcon>
									<ListItemText disableTypography primary={menu.titel} />
								</ListItemButton>
							);
						}
					})}
				</List>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Link underline="none" component={RouterLink} to="#">
				<Box
					sx={{
						mb: 2,
						mx: isOpenSidebar ? 2 : 1,
						p: 1,
						bgcolor: "grey.200",
						borderRadius: 2,
						position: "relative",
						color: "black",
						":hover": { bgcolor: "grey.300" },
					}}
				>
					<Typography variant="h6">DKK</Typography>
				</Box>
			</Link>
		</>
	);

	return (
		<RootStyle>
			{/* hides below if lgUp or bigger */}
			<HideComponent width="lgUp">
				<Drawer1
					open={isOpenSidebar}
					variant="temporary"
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH },
					}}
				>
					{renderContent}
				</Drawer1>
			</HideComponent>
			{/* hides below if lgDown or less */}
			<HideComponent width="lgDown">
				<Drawer
					open={isOpenSidebar}
					variant="permanent"
					onClose={onCloseSidebar}
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: "background.default",
						},
					}}
				>
					{renderContent}
				</Drawer>
			</HideComponent>
		</RootStyle>
	);
}
