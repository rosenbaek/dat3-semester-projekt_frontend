import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
	Box,
	Link,
	List,
	Drawer as Drawer1,
	useTheme,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	IconButton,
	Typography,
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

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<>
			<Box
				sx={{
					height: 92,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box onClick={onCloseSidebar}>
					<IconButton
						onClick={onCloseSidebar}
						sx={
							isOpenSidebar
								? {
										float: "right",
										marginRight: 2,
										color: "#A09EB8",
								  }
								: { color: "#A09EB8" }
						}
					>
						{isOpenSidebar ? (
							<Typography variant="h4">Stock Monitor</Typography>
						) : (
							<Icon icon={menu2Fill} />
						)}
					</IconButton>
				</Box>
			</Box>

			<Box sx={{ display: "flex", flex: 1 }}></Box>
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
										color: "#A09EB8",
										mx: 2,
										mb: 2,
										borderRadius: 3,
										textTransform: "capitalize",
										paddingLeft: isOpenSidebar
											? theme.spacing(2.5)
											: theme.spacing(1),
										paddingRight: theme.spacing(2.5),

										"&:hover": {
											color: "#A09EB8",
											backgroundColor: "#F4F5F9",
										},
										...(pathname === menu.path && {
											color: "#A09EB8",
											fontWeight: "fontWeightMedium",
											bgcolor: "#F4F5F9",
											"&:before": { display: "block" },
											"&:hover": {
												color: "#A09EB8",
												backgroundColor: "#F4F5F9",
											},
										}),
									}}
								>
									<ListItemIcon
										sx={{
											...(pathname === menu.path
												? {
														color: "#A09EB8",
												  }
												: { color: "#A09EB8" }),
										}}
									>
										{menu.icon}
									</ListItemIcon>
									<ListItemText disableTypography primary={menu.titel} />
								</ListItemButton>
							);
						} else {
							return null;
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
						backgroundColor: "#F4F5F9",
						borderRadius: 2,
						position: "relative",
						color: "#A09EB8",
						verticalAlign: "center",
						":hover": { bgcolor: "#EFEFF2" },
					}}
				>
					DKK
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
					onMouseEnter={onCloseSidebar}
					onMouseLeave={onCloseSidebar}
					transitionDuration={{ enter: 500, exit: 1000 }}
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
