import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, matchPath } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
	Box,
	Link,
	Drawer,
	Typography,
	List,
	Avatar,
	useTheme,
	ListItemButton,
	ListItemText,
	ListItemIcon,
} from "@mui/material";

// components
import { MHidden } from "../components/@material-extend";
import MenuValues from "./MenuValues";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("lg")]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
}));

const AccountStyle = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 2.5),
	borderRadius: 10,
	backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

Sidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
};

export default function Sidebar({
	isOpenSidebar,
	onCloseSidebar,
	loggedIn,
	user,
}) {
	const { pathname } = useLocation();
	const theme = useTheme();

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<>
			<Box sx={{ px: 2.5, py: 3 }}>
				<Box
					component={RouterLink}
					to="/"
					sx={{ display: "inline-flex" }}
				></Box>
			</Box>

			<Box sx={{ mb: 5, mx: 2.5 }}>
				<Link underline="none" component={RouterLink} to="/">
					<AccountStyle>
						<Avatar
							src={"/static/mock-images/avatars/avatar_default.jpg"}
							alt="photoURL"
						/>
						<Box sx={{ ml: 2 }}>
							<Typography
								variant="subtitle2"
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
									component={RouterLink}
									to={menu.path}
									sx={{
										height: 48,
										color: "grey",
										mx: 2.5,
										mb: 1,
										borderRadius: 3,
										textTransform: "capitalize",
										paddingLeft: theme.spacing(2.5),
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
						mx: 2.5,
						p: 1,
						bgcolor: "grey.200",
						borderRadius: 2,
						position: "relative",
						color: "black",
						":hover": { bgcolor: "grey.300" },
					}}
				>
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="h6">DKK</Typography>
					</Box>
				</Box>
			</Link>
		</>
	);

	return (
		<RootStyle>
			<MHidden width="lgUp">
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH },
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>

			<MHidden width="lgDown">
				<Drawer
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: "background.default",
						},
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>
		</RootStyle>
	);
}
